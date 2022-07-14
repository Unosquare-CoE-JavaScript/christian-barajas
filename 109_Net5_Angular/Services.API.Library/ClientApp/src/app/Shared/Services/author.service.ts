import { Injectable } from '@angular/core';
import { Author } from '../Interfaces';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseURL = environment.servicesURL;

  private authors: Author[] = [];
  private authors$ = new BehaviorSubject<Author[]>(this.authors);
  constructor(private http: HttpClient) { }

  getAuthors(){
    this.http.get<Author[]>(`${this.baseURL}/authors`)
      .subscribe((data) => {
        this.authors = data;
        this.authors$.next([...this.authors]);
      })
  }

  getStaticAuthors(){
    return this.authors;
  }
  getAuthorsListener() {
    return this.authors$.asObservable();
  }
}
