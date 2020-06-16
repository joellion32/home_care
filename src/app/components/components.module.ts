import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [HeaderComponent, SkeletonComponent, ButtonComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    SkeletonComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
