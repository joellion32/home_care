import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any[] = [];
  loading: boolean = true;

  constructor(private registerService: RegisterService, private nav: NavController) { }

  ngOnInit() {
    this.LoadCategories();
  }


  LoadCategories(){
    this.registerService.getCategories().subscribe(resp => {
      this.categories = resp['categories'];
      this.loading = false;
      console.log(this.categories);
    });
  }


  navigate(id: string){
    this.nav.navigateForward(`professions/${id}`)
  }

}
