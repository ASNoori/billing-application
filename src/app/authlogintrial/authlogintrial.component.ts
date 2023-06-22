import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from '../Services/notifier.service';

@Component({
  selector: 'app-authlogintrial',
  templateUrl: './authlogintrial.component.html',
  styleUrls: ['./authlogintrial.component.css']
})
export class AuthlogintrialComponent implements OnInit {

  loginform!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast:NotifierService,
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  hide: boolean = false;


  login() {
    if (!this.loginform.valid) {
      return;
    }
    this.http.post<any>('http://localhost:3000/api/user/login',this.loginform.value).subscribe(

      data => {
        console.log(data);

  //*****store token
        localStorage.setItem('token',data.toString());
        this.toast.Showsuccess('Signup successful');
        this.router.navigate(['billing']);
             },
      (err) => {
        this.toast.Showerror('Something went wrong');
      }
    );
  }
}


