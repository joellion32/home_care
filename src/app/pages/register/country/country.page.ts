import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  search_text: string = '';
  countries: any[] = [];

  constructor(private nav: NavController, private countryService: CountryService) { }

  ngOnInit() {
   this.loadData();
  }

  // funciones 
  search(event ){
    this.search_text = event.detail.value;
  }

  // navegar a la ciudad
  city(){
    this.nav.navigateForward('city');
  }

  async loadData(){
    await this.countryService.getCountry().subscribe(resp => {
      this.countries = resp;
      console.log(this.countries);
    })
  }


}
