import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { ListComponent } from './list/list.component';
import { BookComponent } from './book/book.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../Shared/Services/book.service';
import { FullMaterialModule } from '../Shared/Material/full-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../Shared/Partials/dialog.module';
import { BookNewComponent } from '../Shared/Partials/book-new/book-new.component';

@NgModule({
  declarations: [
    BooksComponent,
    ListComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    FlexLayoutModule,
    FullMaterialModule,
    DialogModule,
  ],
  providers:[
    BookService,
  ]
})
export class BooksModule { }
