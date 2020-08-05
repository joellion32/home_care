import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsDetailPageRoutingModule } from './jobs-detail-routing.module';

import { JobsDetailPage } from './jobs-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsDetailPageRoutingModule
  ],
  declarations: [JobsDetailPage]
})
export class JobsDetailPageModule {}
