import { Component, OnInit, OnChanges } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { JobsService } from 'src/app/services/jobs.service';
import { Plugins } from '@capacitor/core';
import { Jobs } from 'src/app/interfaces/jobs_interface';
const { Storage } = Plugins;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit, OnChanges {
  id: string;
  token: string;
  jobs: Jobs;
  value: any = 'PENDING';

  constructor(public menuCtrl: MenuController, private jobsService: JobsService, private nav: NavController) {
    
   }

 async ngOnInit() {
    const ret1 = await Storage.get({ key: 'client_data' });
    const user = JSON.parse(ret1.value);

    const ret2 = await Storage.get({ key: 'token' });
    const token = JSON.parse(ret2.value);

    this.id = user.user._id
    this.token = token.token;

    this.loadJobs();
  }

  ngOnChanges(){
    this.loadJobs();
  }

   // cambiar segment
  segmentChanged(event){
    this.value = event.detail.value;
    this.loadJobs();
  }



  // mostrar menu
  showMenu() {
    this.menuCtrl.toggle();
  }


  //cargar data
  loadJobs(){
    this.jobsService.getjobs_client(this.id, this.value, this.token).subscribe(resp => {
      this.jobs = resp['jobs']
      console.log()
    })
    
  }

  navigate(id: string){
    this.nav.navigateForward(`jobs-detail/${id}`)
  }

}
