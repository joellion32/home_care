import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category_interface';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  subscribe: any;
  categories: Category[] = [];
  loading: boolean = true;

  constructor(public platform: Platform, public menuCtrl: MenuController, 
    public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
  }

  // mostrar menu
  showMenu(){
    this.menuCtrl.toggle();
  }

  getCategories(){
    this.dataService.getCategories().subscribe(resp => {
      this.categories = resp['categories'];
      this.loading = false;
    });
  }

  // nevegar hacia los servicios
  async navigate_services(id, category){
    // guardar datos en el storage
     await Storage.set({key: 'category', value: category});
     this.router.navigateByUrl('service/' + id);
  }
}
