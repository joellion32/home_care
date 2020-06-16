import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscriptionPageRoutingModule } from './suscription-routing.module';

import { SuscriptionPage } from './suscription.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscriptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SuscriptionPage]
})
export class SuscriptionPageModule {}
