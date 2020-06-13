import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonDataPageRoutingModule } from './person-data-routing.module';

import { PersonDataPage } from './person-data.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PersonDataPageRoutingModule
  ],
  declarations: [PersonDataPage]
})
export class PersonDataPageModule {}
