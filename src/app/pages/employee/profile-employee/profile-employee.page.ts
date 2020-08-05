import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobsService } from 'src/app/services/jobs.service';
import { LoadingService } from 'src/app/services/components/loading.service';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/interfaces/user_iterface';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
const { Storage } = Plugins;

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.page.html',
  styleUrls: ['./profile-employee.page.scss'],
})
export class ProfileEmployeePage implements OnInit {
  employee: any = {};
  service: string;
  id: string;
  
  constructor(private employeeService: EmployeeService, 
    private jobService: JobsService, private loadingService: LoadingService, 
    private nav: NavController, private activateRoute: ActivatedRoute) {

     }

    async ngOnInit() {
      // service
      const ret = await Storage.get({ key: 'search_service' });
      const service = JSON.parse(ret.value);    
      this.service = service.service.service

      // id 
      this.id = this.activateRoute.snapshot.params.id;
      this.LoadData();
    }

    LoadData(){
      this.employeeService.get_employee_id(this.id).subscribe(resp => {
        this.employee = resp['user'];
      });
    }

    // guardar servicio
  async save_job(){
    this.loadingService.presentLoading();

    // cargar servicio storage
    const ret1 = await Storage.get({ key: 'service' });
    const service = JSON.parse(ret1.value);  

    // cargar usuario del storage
    const ret2 = await Storage.get({ key: 'client_data' });
    const client = JSON.parse(ret2.value);  
    
    const data = {
      client_id: client.user._id,
      employe_id: this.employee._id,
      title: service.data.service,
      description: service.data.description,
      location: service.data.location
      }
      this.jobService.save_jobs(data).subscribe(resp => {
        this.loadingService.closeLoading();
        this.nav.navigateForward('tabs/jobs')
      });
  }
}
