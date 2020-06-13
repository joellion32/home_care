import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})


export class SlidesPage implements OnInit {

  constructor(private nav: NavController) { }
  

  ngOnInit() {
   
  }


  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/svg/photos.svg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/svg/music-player-2.svg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/svg/calendar.svg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/svg/placeholder-1.svg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];

  // navegar a la pagina de login
  async login(user: String){
    if(user == "colaborador"){
      this.nav.navigateForward('login');
      await Storage.set({key: 'user', value: user.toString()});
    }

    else if(user == "cliente"){
      this.nav.navigateForward('login');
      await Storage.set({key: 'user', value: user.toString()});
    }

  }
  
}
