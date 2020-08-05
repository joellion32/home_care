import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';
import { BackgroundComponent } from './background/background.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { NotFoundComponent } from './not-found/not-found.component';




@NgModule({
  declarations: [HeaderComponent, SkeletonComponent, ButtonComponent, MenuComponent, BackgroundComponent, LoadingComponent, SearchEmployeeComponent, NotFoundComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    SkeletonComponent,
    ButtonComponent,
    MenuComponent, 
    BackgroundComponent,
    LoadingComponent,
    SearchEmployeeComponent,
    NotFoundComponent
  ]
})
export class ComponentsModule { }
