import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Book } from "../Interfaces";
import { Pagination } from "../Interfaces/pagination.model";

@Injectable({
  providedIn: "root",
})
export class BookService {
  baseURL = environment.servicesURL;

  bookList: Pagination<Book> = {
    pageSize: 5,
    page: 1,
    sort: 'title',
    sortDirection: 'asc',
    pageQuantity: 0,
    data: [],
    FilterItem: {},
    totalRows: 0,
  };
  bookList$ = new BehaviorSubject<Pagination<Book>>(this.bookList);

  book: Book;
  book$ = new Subject<null>();

  constructor(private http: HttpClient) {}

  getBooks(
    pageSize: number,
    currentPage: number,
    sort: string,
    sortDirection: string,
    filterItem: any
  ) {
    const request = {
      pageSize,
      page: currentPage,
      sort,
      sortDirection,
      filterItem,
    };
    this.http
      .post<Pagination<Book>>(`${this.baseURL}/books/query`, request)
      .subscribe((response: Pagination<Book>) => {
        this.bookList = response;
        this.bookList$.next(this.bookList);
      });
  }

  getBooksListener(){
    return this.bookList$.asObservable();
  }

  saveBook(book: Book) {
    this.http.post(`${this.baseURL}/books`, book)
      .subscribe(response => {
        this.book$.next();
      });
    // this.bookList.push(book);
  }
  saveBookListener() {
    return this.book$.asObservable();
  }

  addBook(title: string) {
  }

  deleteBook(title: string) {
  }
}
