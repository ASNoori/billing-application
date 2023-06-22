import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { NotifierService } from '../Services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  loginform!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast:NotifierService,
    private loginservice:LoginService
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  login() {
    if (!this.loginform.valid) {
      return;
    }
    // this.http.get<any>('http://localhost:3000/signupusers').subscribe(
          this.loginservice.getlogindetail(this.loginform.value).subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginform.value.email &&
            a.password === this.loginform.value.password
          );
        });
        console.log(user.email)
        localStorage.setItem("user",user.email);
        console.log(res);

  //*****store token
        // localStorage.setItem('token',res.toString());
        // this.toast.Showsuccess('Signup successful');
        // this.loginform.reset();
        this.router.navigate(['billing']);
        // if (user) {
        //   this.toast.Showsuccess('login success');
        //   this.loginform.reset();
        //   //  if(user.email==='admin@sd' && user.password === 'admin_12'){
          // this.router.navigate(['/billing']);

        //   //  }else{
        //   //   this.router.navigate(['/']);

        //   //  }
        // } else {
          
        //  this.toast.Showerror('user not found');
        // }
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
      }
    );
  }
}
