import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionsPageRoutingModule } from './professions-routing.module';

import { ProfessionsPage } from './professions.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    ProfessionsPageRoutingModule
  ],
  declarations: [ProfessionsPage]
})
export class ProfessionsPageModule {}
