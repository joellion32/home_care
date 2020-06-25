import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';




@NgModule({
  declarations: [HeaderComponent, SkeletonComponent, ButtonComponent, MenuComponent, TabsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    SkeletonComponent,
    ButtonComponent,
    MenuComponent, 
    TabsComponent
  ]
})
export class ComponentsModule { }
