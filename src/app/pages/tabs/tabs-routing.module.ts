import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: 
    [
      {
        path: 'home',
        loadChildren: () => import('../clients/panel/panel.module').then( m => m.PanelPageModule)      
      },
      {
        path: 'panel',
        loadChildren: () => import('../employee/panel-employe/panel-employe.module').then( m => m.PanelEmployePageModule)      
      },
      {
        path: 'profile',
        loadChildren: () => import('../clients/profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
