import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs";
import { Author } from "src/app/Shared/Interfaces";
import { AuthorService } from "src/app/Shared/Services/author.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  deployColumns: string[] = ["name", "lastName", "academicDegree"];
  dataSource = new MatTableDataSource<Author>([]);
  @ViewChild(MatSort, { static: false }) order: MatSort;
  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;

  private authors$: Subscription;

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.authorService.getAuthors();
    this.authors$ = this.authorService.getAuthorsListener()
      .subscribe((authors: Author[]) => {
        this.dataSource.data = authors;
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy(): void {
    this.authors$.unsubscribe();
  }

  onFilter(event: { target: { value: any; }; }) {
    const {target: {value}} = event;

    this.dataSource.filter = value;
  }

}
