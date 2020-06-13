import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];

  constructor(private categoriesService: CategoriesService, private nav: NavController) { }

  ngOnInit() {
    this.LoadCategories();
  }


  LoadCategories(){
    this.categoriesService.getCategories().subscribe(resp => {
      this.categories = resp['categories'];
      console.log(this.categories);
    });
  }


  navigate(id: string){
    this.nav.navigateForward(`professions/${id}`)
  }

}
