import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelEmployePageRoutingModule } from './panel-employe-routing.module';

import { PanelEmployePage } from './panel-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelEmployePageRoutingModule
  ],
  declarations: [PanelEmployePage]
})
export class PanelEmployePageModule {}
