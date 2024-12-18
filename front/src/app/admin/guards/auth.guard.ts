import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authService = inject( AuthService )

  // return authService.renewToken();

  if(!localStorage.getItem('token')){
    router.navigateByUrl('/');
    return false;
  }

  return true;



};
