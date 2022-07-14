import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(form: NgForm){
    this.authService.register({
      name: form.value.firstName,
      lastName: form.value.lastName,
      userName: form.value.username,
      email:form.value.email,
      password:form.value.password,
      id: null,
      jwtToken: null
    })
  }
}
