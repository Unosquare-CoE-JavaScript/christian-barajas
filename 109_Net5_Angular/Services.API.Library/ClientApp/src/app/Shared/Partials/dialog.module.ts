import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookNewComponent } from './book-new/book-new.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MAT_DATE_LOCALE } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [BookNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports:[
    BookNewComponent,
  ],
  entryComponents:[BookNewComponent],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ]
})
export class DialogModule { }
