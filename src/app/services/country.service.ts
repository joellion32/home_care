import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }


  getCountry(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map(
        (resp: any[]) => {
          return resp.map(country => {
            return {
              code: country.alpha3Code,
              name: country.name,
              flag: country.flag
            }
          });
        }
      )

    ); // cierre del pipe
     
  
  }

} // cierre de la clase
