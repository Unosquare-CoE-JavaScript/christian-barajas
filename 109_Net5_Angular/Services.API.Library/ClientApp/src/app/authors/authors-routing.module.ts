import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '', component: AuthorsComponent,
    children:[
      { path: 'list', component: ListComponent },
      { path: 'author', component: AuthorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
