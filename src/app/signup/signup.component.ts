import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from '../Services/notifier.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide: boolean = false;

  signupform!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast:NotifierService
  ) {}

  ngOnInit(): void {
    this.signupform = this.fb.group({
      fullname: new FormControl('',[Validators.required]),
      // mobile: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  signup() {
    if (!this.signupform.valid) {
      return;
    }
    this.http
      .post<any>('http://localhost:3000/api/user/add', this.signupform.value)
      .subscribe(
        (res) => {
          this.toast.Showsuccess('Signup successful');
          this.signupform.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          this.toast.Showerror('Something went wrong');
        }
      );
  }
}
