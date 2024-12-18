import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
//interfaces
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrdenesService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getOrden(id:string | null) {

    const url = `${this.baseUrl}/ordenes/mesa/${id}`;
    return this.http.get(url);
  }

  //get users
  getOrdenes() {

    const url = `${this.baseUrl}/ordenes/listar`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create cliente
  createOrden(form:any){

    const url = `${this.baseUrl}/ordenes/create`;
    return this.http.post(url, form)
  }

  // delete cliente
  deleteOrden(id:string){

    const url = `${this.baseUrl}/ordenes/eliminar/${id}`;
    return this.http.delete(url)
  }

  // update cliente
  updateOrden(id:string | null, form:any){
    const url = `${this.baseUrl}/ordenes/actualizar/${id}`;
    return this.http.put(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


