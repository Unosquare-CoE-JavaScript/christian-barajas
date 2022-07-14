import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  MatDatepicker,
  MatDialog,
  MatOption,
  MatSelectChange,
} from "@angular/material";
import { Subscription } from "rxjs";
import { Author } from "../../Interfaces";
import { AuthorService } from "../../Services/author.service";
import { BookService } from "../../Services/book.service";

@Component({
  selector: "app-book-new",
  templateUrl: "./book-new.component.html",
  styleUrls: ["./book-new.component.scss"],
})
export class BookNewComponent implements OnInit, OnDestroy {
  authors: Author[] = [];
  authors$: Subscription;
  authorSelected: string;
  authorValueSelected: string;
  publishDate: string;
  book$: Subscription;

  @ViewChild(MatDatepicker, { static: false }) datePicker: MatDatepicker<Date>;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.authorService.getAuthors();
    this.authors$ = this.authorService
      .getAuthorsListener()
      .subscribe((_authors: Author[]) => {
        this.authors = _authors;
      });
  }

  ngOnDestroy(): void {
    this.authors$.unsubscribe();
    this.book$.unsubscribe();
  }
  selected(event: MatSelectChange) {
    this.authorValueSelected = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {
    const {
      valid,
      value: { title, description, price },
    } = form;

    if (valid) {
      const authorRequest = {
        id: this.authorSelected,
        fullName: this.authorValueSelected,
      };
      const request = {
        id: null,
        title,
        description,
        price: parseInt(price),
        author: authorRequest,
        publishDate: new Date(this.publishDate),
      };
      this.bookService.saveBook(request);
      this.book$ = this.bookService.saveBookListener().subscribe((_) => {
        this.dialogRef.closeAll();
      });
    }
  }
}
