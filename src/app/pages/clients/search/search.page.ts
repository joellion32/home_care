import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
const { Storage } = Plugins;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  country: any;
  provinces: any[] = [];
  id: any;
  constructor(private dataService: DataService, private activateRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    const response = ((await Storage.get({ key: 'client_data' })).value);
    const data = JSON.parse(response);
    this.country = data.user.country
    this.get_countries(this.country)
  }

  get_countries(name: string) {
    this.dataService.getCountryName(name).subscribe(resp => {
    this.provinces = resp['country'][0].provinces;
    });
  }

}
