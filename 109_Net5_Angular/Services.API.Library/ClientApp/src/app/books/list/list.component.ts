import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { BehaviorSubject, Subscription } from "rxjs";
import { Book } from "src/app/Shared/Interfaces";
import { Pagination } from "src/app/Shared/Interfaces/pagination.model";
import { BookNewComponent } from "src/app/Shared/Partials/book-new/book-new.component";
import { BookService } from "src/app/Shared/Services/book.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  bookList: Book[];
  private bookList$: Subscription;
  books$ = new BehaviorSubject<string[]>([]);
  deployColumns: string[] = ["title", "description", "author", "price"];
  dataSource = new MatTableDataSource<Book>();
  @ViewChild(MatSort, { static: false }) order: MatSort;
  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;

  itemsPerPage = 2;
  currentPage = 1;
  pageQuantity = 1;
  pageSizeOptions = [1, 2, 5, 10];
  sort = "title";
  sortDirection = "asc";
  filterItem: {};

  timeoutFilter: any = null;


  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getBooks(
      this.itemsPerPage,
      this.currentPage,
      this.sort,
      this.sortDirection,
      this.filterItem
    );
    this.bookList$ = this.bookService
      .getBooksListener()
      .subscribe((response: Pagination<Book>) => {
        this.dataSource.data = response.data;
        this.pageQuantity = response.pageQuantity;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy(): void {
    this.bookList$.unsubscribe();
  }

  eventPaginator(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.bookService.getBooks(
      this.itemsPerPage,
      this.currentPage,
      this.sort,
      this.sortDirection,
      this.filterItem
    );
  }

  onFilter(event) {
    const {
      target: { value },
      keyCode,
    } = event;


    clearTimeout(this.timeoutFilter);

    var $this = this;

    this.timeoutFilter = setTimeout(function () {
      if (keyCode !== 13) {
        const filterItemLocal = {
          property: 'title',
          value,
        }
        $this.filterItem = filterItemLocal;

        $this.bookService.getBooks(
          $this.itemsPerPage,
          $this.currentPage,
          $this.sort,
          $this.sortDirection,
          filterItemLocal
        );

      }
    }, 1000);
  }

  sortByColumns(event) {
    this.sort = event.active;
    this.sortDirection = event.direction;

    this.bookService.getBooks(
      this.itemsPerPage,
      this.currentPage,
      this.sort,
      this.sortDirection,
      this.filterItem
    );
  }
  onButtonAdd() {
    const dialogRef = this.dialog.open(BookNewComponent, {
      width: "550px",
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.bookService.getBooks(
        this.itemsPerPage,
        this.currentPage,
        this.sort,
        this.sortDirection,
        this.filterItem
      );
    });
  }

  onBookClicked(bookSelected: string) {
    console.log(bookSelected);
    this.bookService.deleteBook(bookSelected);
  }

  saveBook(form: NgForm) {
    if (form.valid && form.value.bookName) {
      this.bookService.addBook(form.value.bookName);
    }
  }
}
