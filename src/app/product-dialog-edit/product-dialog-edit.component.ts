import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductModel } from '../product-dialog/product.model';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product-dialog-edit',
  templateUrl: './product-dialog-edit.component.html',
  styleUrls: ['./product-dialog-edit.component.css']
})
export class ProductDialogEditComponent implements OnInit {

  hide: boolean = false;

  productform!: FormGroup;
  ProductModelObj: ProductModel = new ProductModel();
  ProductData!: any;
  constructor(public api: ProductService,private fb:FormBuilder, private http:HttpClient, private router: Router, public dialogref:MatDialogRef<ProductDialogComponent>) { }

  ngOnInit(): void {
    this.productform =this.fb.group({
      'name': new FormControl(),
      'price': new FormControl(),
      'code': new FormControl()
    })
  }

onClose(){
  // this.service.form.reset();
  this.dialogref.close();
}
postproductDetails() {
  this.ProductModelObj.name = this.productform.value.name;
  this.ProductModelObj.price = this.productform.value.price;
  this.ProductModelObj.code = this.productform.value.code;
  if (!this.productform.valid) {
    return;
  }
  this.api.postproduct(this.ProductModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Product Added Successfully");
      this.onClose();
      let ref = document.getElementById("cancel");
      ref?.click();
      this.productform.reset();

    }, err => {
      alert("Something went wrong");
      console.log(err);
    })
}
}

