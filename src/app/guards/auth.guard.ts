import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in
    const authPages = ['sign-in', 'sign-up']; // Routes to restrict when logged in

    if (isLoggedIn && authPages.includes(route.routeConfig?.path || '')) {
      this.router.navigate(['/dashboard']); // Redirect logged-in users away from auth pages
      return false;
    }

    if (!isLoggedIn && !authPages.includes(route.routeConfig?.path || '')) {
      this.router.navigate(['/sign-in']); // Redirect non-logged-in users away from protected pages
      return false;
    }

    return true; // Allow access
  }
}
