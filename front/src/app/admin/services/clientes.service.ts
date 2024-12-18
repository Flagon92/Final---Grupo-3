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
export class ClientesService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getCliente(id:string | null) {

    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get(url);
  }

  //get users
  getClientes() {

    const url = `${this.baseUrl}/clientes/listar`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create cliente
  createCliente(form:any){

    const url = `${this.baseUrl}/clientes/crear`;
    return this.http.post(url, form)
  }

  // delete cliente
  deleteCliente(id:string){

    const url = `${this.baseUrl}/clientes/eliminar/${id}`;
    return this.http.delete(url)
  }

  // update cliente
  updateCliente(id:string | null, form:any){
    const url = `${this.baseUrl}/clientes/actualizar/${id}`;
    return this.http.put(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


