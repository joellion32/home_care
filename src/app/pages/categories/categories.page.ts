import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];
  loading: boolean = true;

  constructor(private dataService: DataService, private nav: NavController) { }

  ngOnInit() {
    this.LoadCategories();
  }


  LoadCategories(){
    this.dataService.getCategories().subscribe(resp => {
      this.categories = resp['categories'];
      this.loading = false;
      console.log(this.categories);
    });
  }


  navigate(id: string){
    this.nav.navigateForward(`professions/${id}`)
  }

}
