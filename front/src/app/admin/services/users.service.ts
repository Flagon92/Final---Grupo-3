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
export class UsersService {

  private readonly baseUrl:string = environment.baseUrl;
  http = inject(HttpClient);
  authService = inject(AuthService);


  //get users
  getUser(id:string | null): Observable<UserResponse> {

    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.get<UserResponse>(url);
  }

  //get users
  getUsers(): Observable<UsersResponse> {

    const url = `${this.baseUrl}/usuarios`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get<UsersResponse>(url, { headers }); // angular solicita que se le pase los headers entre llaves
  }

  // create user
  createUser(form:any): Observable<UserResponse>{

    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<UserResponse>(url, form)
  }

  // delete user
  deleteUser(id:string): Observable<UserResponse>{

    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.delete<UserResponse>(url)
  }

  // update user
  updateUser(id:string | null, form:any): Observable<UserResponse>{
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.put<UserResponse>(url, form)
  }

  uploadFile(formData: FormData){
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData);

  }


}


