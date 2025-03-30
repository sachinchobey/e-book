import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchasedBooksComponent } from './components/purchased-books/purchased-books.component';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'purchased-books', component: PurchasedBooksComponent, canActivate: [AuthGuard] },
  { path: 'read-book/:id', component: ReadBookComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-in' }
];
