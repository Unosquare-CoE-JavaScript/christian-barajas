import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { ListComponent } from './list/list.component';
import { AuthorComponent } from './author/author.component';
import { FullMaterialModule } from '../Shared/Material/full-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [AuthorsComponent, ListComponent, AuthorComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    FullMaterialModule,
    FlexLayoutModule,
  ],
  providers:[]
})
export class AuthorsModule { }
