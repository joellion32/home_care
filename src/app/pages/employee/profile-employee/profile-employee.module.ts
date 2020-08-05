import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEmployeePageRoutingModule } from './profile-employee-routing.module';

import { ProfileEmployeePage } from './profile-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEmployeePageRoutingModule
  ],
  declarations: [ProfileEmployeePage]
})
export class ProfileEmployeePageModule {}
