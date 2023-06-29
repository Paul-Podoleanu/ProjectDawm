import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import userData from '../services/users.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  //Declaratii
  loginForm!: UntypedFormGroup;


  constructor(private userService: UserService,  private router: Router, private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      remember: [true]
    });
  }

  userIsValid(): boolean {
    return this.userService.checkUser(this.loginForm.value.username, this.loginForm.value.password);
  }

  loginClick(): void {
    if (this.userIsValid()) {
    this.router.navigate(['/main-page']);
    }
    else {
      alert("Username or password is incorrect!");
    }
  }
}
