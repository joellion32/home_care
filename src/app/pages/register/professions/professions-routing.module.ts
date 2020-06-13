import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionsPage } from './professions.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionsPageRoutingModule {}
