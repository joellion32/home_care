import { Injectable } from '@angular/core';
import { User } from '../interfaces/user_iterface';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  data: User;
  url: string = environment.url;
  constructor(private http: HttpClient, private transfer: FileTransfer) { }


  async saveData(name: string, email: string, password: string, telephone: string, country: string,
    city: string, location: string, zip_code: number, profession?: string[], description?: string, suscription?: string) {
    this.data = {
      name: name,
      email: email,
      password: password,
      telephone: telephone,
      country: country,
      city: city,
      location: location,
      zip_code: zip_code,
      profession: profession,
      description: description,
      id_suscription: suscription
    }

    // guardar en el local storage
    await Storage.set({
      key: 'client',
      value: JSON.stringify({
        client: this.data
      })
    });
  }


  /*-----------------------------------FUNCIONES PARA REGISTRAR USUARIO---------------------------------------------------*/
  // guardar cliente
  async saveClient() {
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);
    return this.http.post(`${this.url}clients/register`, user.client);
  }


  // guardar colaborador
  async saveEmployee() {
    const data = await Storage.get({ key: 'client' });
    const user = JSON.parse(data.value);
    return this.http.post(`${this.url}employee/register`, user.client);
  }

  // guardar foto colaborador
  async updatePhoto(photo: string) {
    const data = await Storage.get({ key: '_id' });
    const id = JSON.parse(data.value);

    const options: FileUploadOptions = {
      fileKey: 'photo',
    };

    const fileTransfer: FileTransferObject = this.transfer.create()

    // subir imagen
    fileTransfer.upload(photo, `${this.url}upload/images/${id}`, options)
      .then(resp => console.log(resp))
      .catch(err => console.log('Error al cargar', err));

  }

}
