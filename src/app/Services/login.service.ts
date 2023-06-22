import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: HttpClient,private fb:FormBuilder) { }
  getlogindetail(data:any){
    return this.http.post<any>("http://localhost:3000/api/user/login",data)
    .pipe(map((res: any)=>{
      return res;
    }))
    
  }
  loggedIn(){
    const username = localStorage.getItem("user");
    if(username == '' || username == null){
      return false;
    }
    else{
      return true;
    }
     
  //  return Boolean(username);
   
  }
}