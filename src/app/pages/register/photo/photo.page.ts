import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';

const { Camera } = Plugins;

declare var window: any;

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  photo: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private storageService: StorageService) { }

  ngOnInit() {
  }

  // tomar foto
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(this.photo);

     // convertir imagen y enviar al servicio
     const fileImage = window.Ionic.WebView.convertFileSrc(image.dataUrl)
     console.log('imagen:', fileImage);
     await this.storageService.updatePhoto(image.dataUrl);
  }

// cargar galeria
  async loadGallery() {
    const image = await Camera.getPhoto({
      quality: 75,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    // convertir para que se vea en la pantalla
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  

     // convertir imagen y enviar al servicio
    const fileImage = window.Ionic.WebView.convertFileSrc(image.dataUrl)
    console.log('imagen:', fileImage);
    await this.storageService.updatePhoto(image.dataUrl);
  }


  

}
