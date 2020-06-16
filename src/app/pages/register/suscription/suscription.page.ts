import { Component, OnInit } from '@angular/core';
import { SuscriptionsService } from 'src/app/services/suscriptions.service';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.page.html',
  styleUrls: ['./suscription.page.scss'],
})
export class SuscriptionPage implements OnInit {
  suscriptions: any[] = [];
  constructor(private suscriptionService: SuscriptionsService) { }

  ngOnInit() {
    this.suscriptionService.getSuscriptions().subscribe(resp => {
      this.suscriptions = resp['suscription']
    })
    
  }

}
