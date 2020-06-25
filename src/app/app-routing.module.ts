import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'slides',
    pathMatch: 'full'
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/register/country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./pages/register/city/city.module').then( m => m.CityPageModule)
  },
  {
    path: 'person-data',
    loadChildren: () => import('./pages/register/person-data/person-data.module').then( m => m.PersonDataPageModule)
  },
  {
    path: 'professions/:id',
    loadChildren: () => import('./pages/register/professions/professions.module').then( m => m.ProfessionsPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./pages/register/photo/photo.module').then( m => m.PhotoPageModule)
  },
  {
    path: 'description',
    loadChildren: () => import('./pages/register/description/description.module').then( m => m.DescriptionPageModule)
  },
  {
    path: 'suscription',
    loadChildren: () => import('./pages/register/suscription/suscription.module').then( m => m.SuscriptionPageModule)
  },
  {
    path: 'panel-client',
    loadChildren: () => import('./pages/clients/panel/panel.module').then( m => m.PanelPageModule)
  },
  {
    path: 'panel-employe',
    loadChildren: () => import('./pages/employee/panel-employe/panel-employe.module').then( m => m.PanelEmployePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
