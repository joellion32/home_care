import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  search_text: string = '';
  countries: any[] = [];
  loading: boolean = true;
  constructor(private nav: NavController, private registerService: RegisterService, private storageService: StorageService) { }

  ngOnInit() {
   this.loadData();
  }

  // funciones 
  search(event ){
    this.search_text = event.detail.value;
  }

  // navegar a la pagina de localizacion y guardar los datos
  country(country: string){
    this.storageService.saveData('', '', '', '', country, '', '', 0);
    this.nav.navigateForward('city');
  }

  // cargar la data
  async loadData(){
    this.registerService.getCountry().subscribe(resp => {
      this.countries = resp;
      this.loading = false;
      console.log(this.countries);
    })
  }


}
