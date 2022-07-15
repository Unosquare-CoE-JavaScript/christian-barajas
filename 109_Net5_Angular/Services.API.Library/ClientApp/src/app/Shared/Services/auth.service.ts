import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User, LoginData } from "../Interfaces";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseURL = environment.servicesURL;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user: User;
  private JwtToken: string;

  constructor(private router: Router, private http: HttpClient) {}

  loadUser(): void {
    console.log("LoadUser");
    const localToken = this.getJwtTokenOnLocal();
    if (!localToken) {
      return;
    }
    this.JwtToken = localToken;

    this.http
      .get<User>(`${this.baseURL}/auth/session`)
      .subscribe((response) => {
        this.JwtToken = response.jwtToken;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          jwtToken: response.jwtToken,
          password: "",
          userName: response.userName,
          id: response.id,
        };
        this.isLoggedIn$.next(true);
        this.setJwtTokenOnLocal();
      });
  }

  register(user: User): void {
    this.http
      .post<User>(`${this.baseURL}/auth/register`, user)
      .subscribe((response) => {
        this.JwtToken = response.jwtToken;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          jwtToken: response.jwtToken,
          password: "",
          userName: response.userName,
          id: response.id,
        };
        this.isLoggedIn$.next(true);
        this.setJwtTokenOnLocal();
        this.router.navigate(["/"]);
      });
  }

  login(loginData: LoginData): void {
    this.http
      .post<User>(`${this.baseURL}/auth/login`, loginData)
      .subscribe((response) => {
        this.JwtToken = response.jwtToken;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          jwtToken: response.jwtToken,
          password: "",
          userName: response.userName,
          id: response.id,
        };
        this.isLoggedIn$.next(true);
        this.setJwtTokenOnLocal();
        this.router.navigate(["/"]);
      });
  }

  getUserSession(): void {
    this.http
      .get<User>(`${this.baseURL}/auth/session`)
      .subscribe((response) => {
        this.JwtToken = response.jwtToken;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          jwtToken: response.jwtToken,
          password: "",
          userName: response.userName,
          id: response.id,
        };
        this.isLoggedIn$.next(true);
        this.setJwtTokenOnLocal();
      });
  }

  logout() {
    this.user = null;
    this.isLoggedIn$.next(false);
    this.removeJwtTokenOnLocal();
    this.router.navigate(["/auth/login"]);
  }

  getcurrentUser() {
    return { ...this.user };
  }

  getJwtToken(): string {
    return this.JwtToken;
  }

  getJwtTokenOnLocal(): string {
    return localStorage.getItem("jwtToken");
  }

  setJwtTokenOnLocal() {
    localStorage.setItem("jwtToken", this.JwtToken);
  }

  removeJwtTokenOnLocal() {
    localStorage.removeItem("jwtToken");
  }
  isUserLoggedIn() {
    return this.JwtToken != null;
  }
}
