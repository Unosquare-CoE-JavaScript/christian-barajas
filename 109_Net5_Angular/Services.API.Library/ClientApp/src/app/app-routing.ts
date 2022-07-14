import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthRouter } from './Shared/Services/auth.router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthRouter] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'books', canActivate: [AuthRouter], loadChildren: () => import('./books/books.module').then(m => m.BooksModule)},
  { path: 'authors', canActivate: [AuthRouter], loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthRouter]
})
export class AppRoutingModule {};
