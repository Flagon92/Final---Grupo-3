import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = environment.baseUrl;

  constructor( private http:HttpClient ) { }

     // upload files
     uploadFiles( files:any ) {

      const url = `${this.baseUrl}/upload`;
      const formData = new FormData();

      for ( let file of files ){  // for of sirve para recorrer cualquier objeto iterable
        formData.append('imagen', file) // agrego cada arhivo que hay en files
      }

      return this.http.put( url, formData).pipe(
        map( (resp:any) => {

          return resp.imagen
        }) 
      )
  
    }    

}

