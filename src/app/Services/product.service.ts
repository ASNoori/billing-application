import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { product } from '../bill-detail/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }
  postproduct(data: any){
    return this.http.post<any>("http://localhost:3000/products",data)
    .pipe(map((res: any)=>{

      return res;
    }))
  }
 postproductname(resp:any){
  return this.http.post<any>("http://localhost:3000/productname",resp)
  .pipe(map((res: any)=>{

    return res;
  }))
 }
 postproductcode(resp:any){
  return this.http.post<any>("http://localhost:3000/productcode",resp)
  .pipe(map((res: any)=>{

    return res;
  }))
 }
 
 postproductprice(resp:any){
  return this.http.post<any>("http://localhost:3000/productprice",resp)
  .pipe(map((res: any)=>{

    return res;
  }))
 }
 postproductform(data: any){
  return this.http.post<any>("http://localhost:3000/productform",data)
  .pipe(map((res: any)=>{

    return res;
  }))
}
//   getProductDetail():Observable<product[]>{
//     return this.http.get<any>("http://localhost:3000/products")
  
//     .pipe(map((res: any)=>{
//       return res.map((resp: { name: any; price: any; code: any; id: any; })=>
//      { 
//         return {
//           name:resp.name, 
//           price: resp.price, 
//           code: resp.code,
//           id:resp.id 
//         }
//     })
//   }))
// }
getProductDetail():Observable<product[]>{
  return this.http.get("http://localhost:3000/products")

  .pipe(map((res:any)=>{
    return res;
  }))
}

getCode(){
  return this.http.get("http://localhost:3000/productcode")

  .pipe(map((res:any)=>{
    return res;
  }))
 }
  // getProductCodeDetail(){
  //   return this.http.get<any>("http://localhost:3000/products")
  
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }))
  // }

  putProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/products/"+id,data)
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/products/"+id)
  }

  // deleteList(id:number){
  //   return this.http.delete<any>("http://localhost:3000/customerorderdetails/"+id)

  // }
}
