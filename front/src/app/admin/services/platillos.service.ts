import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
//interfaces
import { AuthService } from './auth.service';
import { UserResponse, UsersResponse } from '../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlatillosService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getPlatillo(id:string | null) {

    const url = `${this.baseUrl}/platillos/${id}`;
    return this.http.get(url);
  }

  //get users
  getPlatillos() {

    const url = `${this.baseUrl}/platillos/listar`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create cliente
  createPlatillo(form:any){

    const url = `${this.baseUrl}/platillos/create`;
    return this.http.post(url, form)
  }

  // delete cliente
  deletePlatillo(id:string){

    const url = `${this.baseUrl}/platillos/eliminar/${id}`;
    return this.http.delete(url)
  }

  // update cliente
  updatePlatillo(id:string | null, form:any) {
    const url = `${this.baseUrl}/platillos/actualizar/${id}`;
    return this.http.put(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


