import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user_iterface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss'],
})
export class SearchEmployeeComponent implements OnInit {
  @Input() service: string;
  @Input() location: string;
  @Input() zip_code: string;

  employees: User;
  loading: boolean = true;

  constructor(public modalCtrl: ModalController, private employeeService: EmployeeService, 
    public nav: NavController) { }

  ngOnInit() {
    this.loadData();
  }

  
  loadData() {
    if (this.location) {
      this.employeeService.get_employees_city(this.service, this.location).subscribe(resp => {
        this.employees = resp['user'];
        console.log(this.employees)
        this.loading = false;
      });
    } else {
      this.employeeService.get_employees_zip(this.service, this.zip_code).subscribe(resp => {
        this.employees = resp['employees'];
        console.log(this.employees)
        this.loading = false;
      });
    }
  }

  // navegar al perfil
  view_profile(id: string){
    this.dismissModal();
    this.nav.navigateForward(`profile-employee/${id}`);
  }




  // close modal
  dismissModal() {
    this.modalCtrl.dismiss({});
  }
}
