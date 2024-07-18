import { map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    map((auth) => {
      if (!auth) {
        router.navigate(['/login']);
        return false;
      }
      else  return true;
    })
    
  )
};
