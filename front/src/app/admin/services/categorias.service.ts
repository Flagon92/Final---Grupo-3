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
export class CategoriasService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getCategoria(id:string | null) {

    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get(url);
  }

  //get users
  getCategorias() {

    const url = `${this.baseUrl}/categorias/listar`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create cliente
  createCategoria(form:any){

    const url = `${this.baseUrl}/categorias/create`;
    return this.http.post(url, form)
  }

  // delete cliente
  deleteCategoria(id:string){

    const url = `${this.baseUrl}/categorias/eliminar/${id}`;
    return this.http.delete(url)
  }

  // update cliente
  updateCategoria(id:string | null, form:any){
    const url = `${this.baseUrl}/categorias/actualizar/${id}`;
    return this.http.put(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


