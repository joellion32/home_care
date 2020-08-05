import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsDetailPage } from './jobs-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JobsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsDetailPageRoutingModule {}
