import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,private fb:FormBuilder) { }
  postcustomer(data: any){
    return this.http.post<any>("http://localhost:3000/customerorderdetails",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  getcustomer(){
    return this.http.get<any>("http://localhost:3000/customerorderdetails")
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  getcustomerbyid(id:number){
    return this.http.get<any>("http://localhost:3000/customerorderdetails/"+id)
    .pipe(map((res: any)=>{
      return res;
    }))
}
  // getProductForm(){
  //     return this.fb.group({
  //       'code':new FormControl(),
  //     'pdtname': new FormControl(),
  //     'quantity': new FormControl(),
  //     'price': new FormControl(),
  //     'total': new FormControl()
  //     })
  // }
}
