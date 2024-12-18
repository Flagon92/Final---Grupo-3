import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

//interceptors
import { AuthInterceptor } from './admin/interceptors/auth.interceptor';
//ngx-toastr
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(
      {
        timeOut: 2000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        progressBar: true,
      }
    ),
    provideHttpClient(
      // withInterceptors([AuthInterceptor])
    ),
  ]
};
