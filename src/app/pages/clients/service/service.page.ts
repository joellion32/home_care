import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Profession } from 'src/app/interfaces/profession_interface';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  id: string;
  loading: boolean = true;
  professions: Profession;
  category: string;

  constructor(private activateRoute: ActivatedRoute, private dataService: DataService) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.category = ((await Storage.get({ key: 'category' })).value);
    this.loadData(this.id);
  }

  //cargar data
  loadData(id) {
    this.dataService.getProfessions(id).subscribe(resp => {
      this.loading = false;
      this.professions = resp['profession'];
    });
  }


}
