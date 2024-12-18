import { inject } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

//services
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const errors  = [
  { code: 401, message: 'Usuario o Email incorrecto' },
  { code: 403, message: 'Caducó la sesión' },
  { code: 404, message: 'No se encontró el recurso solicitado.'},
  { code: 500, message: 'Se ha producido un error en el servidor.'},
];

export const AuthInterceptor:HttpInterceptorFn = (req, next) =>  {

  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe( catchError((error) => handleError(error, toastr, router)))
}

function handleError(error:HttpErrorResponse, toastr:ToastrService, router:Router) {

  const httpError = errors.find(e => e.code === error.status);
  const errorMessage = httpError ? httpError.message : 'Error HTTP desconocido.';

  toastr.error(`${errorMessage}`);

  /* sacar de la app y llevarlo al admin, en el backend yo definí que el error
     403 es cuando no hay token o el token es inválido */

  if (httpError?.code === 403) {
    router.navigate(['/']);
  }

  // para evitar mostrar los errores en la consola en el componente
  // con of genero un observable
  // con new HttpResponse construyo un objeto que representa una respuesta HTTP que tiene info como el status, headers, body, etc...

  return of(new HttpResponse({

    body: {
      errorLogin: error, // en errorLogin inlcuyo el error original como parte de la respuesta
    }
    // esto lo hago para tener un mejor control sobre la respuesta(response) que viene del servidor

  }));

}
