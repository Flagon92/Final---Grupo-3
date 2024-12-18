import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
//interfaces
import { ServicesResponse } from '../interfaces/service.interface';
import { AuthService } from './auth.service';
import { UserResponse, UsersResponse } from '../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MeserosService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getMesero(id:string | null) {

    const url = `${this.baseUrl}/meseros/${id}`;
    return this.http.get(url);
  }

  //get users
  getMeseros() {

    const url = `${this.baseUrl}/meseros/listar`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create user
  createMesero(form:any) {

    const url = `${this.baseUrl}/meseros/create`;
    return this.http.post(url, form)
  }

  // delete user
  deleteMesero(id:string){

    const url = `${this.baseUrl}/meseros/eliminar/${id}`;
    return this.http.delete(url)
  }

  // update user
  updateMesero(id:string | null, form:any){
    const url = `${this.baseUrl}/meseros/actualizar/${id}`;
    return this.http.put(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


