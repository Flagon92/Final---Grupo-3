import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';


export const errorHttpInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe( catchError(handleErrorResponse) );

function handleErrorResponse(error:HttpErrorResponse) {

  // Toastr.error('Error HTTP'); // Acceso correcto al método 'error'

  const apiErrorMessage = error.error.msg;

  alert(apiErrorMessage)

  console.log(apiErrorMessage);




  // return throwError( () => error )

  // para evitar mostrar los errores en la consola en el componente
  return of(new HttpResponse({
    body: {
      error: error, // Inlcuye el error original como parte de la respuesta
    }
  }));




}


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(ToastrService);

  return next(req);
}

