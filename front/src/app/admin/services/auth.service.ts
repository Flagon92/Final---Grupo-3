import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';


//interfaces
import { LoginForm, loginResult } from '../interfaces/login.interface';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioConectado!: any;

  constructor(){
    const usuarioGuardado = localStorage.getItem('usuarioConectado');
    if (usuarioGuardado) {
      this.usuarioConectado = JSON.parse(usuarioGuardado);
    }
  }

  baseUrl = environment.baseUrl;
  http = inject( HttpClient );


  // este método me sirve renovar el token por si no es válido o si está a punto expirar
  // renewToken(): Observable<boolean> {

  //   const url = `${this.baseUrl}/auth/renewtoken`;
  //   const headers = this.createAuthorizationHeader();

  //   return this.http.get( url, { headers }).pipe(
  //     tap( (resp:any) => {
  //       localStorage.setItem('token', resp.tokenRenovado)
  //     }),
  //     map( (resp:any) => true )
  //   )

  // }


  login(body: LoginForm) {

    const url = `${this.baseUrl}/auth`;

    return this.http.post( url, body )
      .pipe(
        tap( (resp:any) => {
            localStorage.setItem('token', resp.token);

            const { password, ...meseroClean} = resp.mesero;
            this.usuarioConectado = meseroClean;
            localStorage.setItem('usuarioConectado', JSON.stringify(meseroClean));
        })
      )
  }

  createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ 'token': token });
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('usuarioConectado');
  }

}
