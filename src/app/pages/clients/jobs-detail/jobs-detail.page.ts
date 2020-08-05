import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/interfaces/jobs_interface';
import { JobsService } from 'src/app/services/jobs.service';
import { Plugins } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
const { Storage } = Plugins;
@Component({
  selector: 'app-jobs-detail',
  templateUrl: './jobs-detail.page.html',
  styleUrls: ['./jobs-detail.page.scss'],
})
export class JobsDetailPage implements OnInit {
  job: any = {};
  token: any;
  id: string;
  employee: any = 
  {
    name: '',
    professions: [],
    stars: 0
  }
  constructor(private jobsService: JobsService, private activateRoute: ActivatedRoute) {}

 async ngOnInit() {
    // token
    const data = await Storage.get({ key: 'token' });
    const token = JSON.parse(data.value);
    this.token = token.token ;

    // id
    this.id = this.activateRoute.snapshot.params.id;

    this.loadData()
  }

  //cargar data
  loadData(){
    this.jobsService.detail_jobs(this.id, this.token).subscribe(resp => {
      this.job = resp['jobs'];
      this.employee.name = this.job.employe_id.name;
      this.employee.professions = this.job.employe_id.profession;
      this.employee.stars = this.job.employe_id.stars;
    })
  }
}
