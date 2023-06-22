import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductModel } from './product.model';
import { ProductService } from '../Services/product.service';
import { NotifierService } from '../Services/notifier.service';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  hide: boolean = false;
  productform!: FormGroup;
  ProductModelObj: ProductModel = new ProductModel();
  ProductData!: any;
  actionBtn: string = 'Save';
  nameData!: string;
  constructor(
    public api: ProductService,
    @Inject(MAT_DIALOG_DATA) public editProduct: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialogref: MatDialogRef<ProductDialogComponent>,
    private toast:NotifierService
  ) {}

  ngOnInit(): void {
    this.productform = this.fb.group({
      name: new FormControl(),
      price: new FormControl(),
      code: new FormControl(),
    });
    if (this.editProduct) {
      this.actionBtn = 'Update';
      this.productform.controls['name'].setValue(this.editProduct.name);
      this.productform.controls['price'].setValue(this.editProduct.price);
      this.productform.controls['code'].setValue(this.editProduct.code);
    }
  }

  onClose() {
    // this.api.form.reset();
    this.dialogref.close();
  }
  postproductDetails() {
    if (!this.editProduct) {
      this.ProductModelObj.name = this.productform.value.name;
      // if (!this.productform.valid) {
      //   return;
      // }
      // this.api.postproductname(this.ProductModelObj).subscribe(
      //   (res) => {
      //     console.log(res);
      //     alert('Product Name Added Successfully');
          this.ProductModelObj.price = this.productform.value.price;
      //     if (!this.productform.valid) {
      //       return;
      //     }
      // this.api.postproductprice(this.ProductModelObj).subscribe(
      //   (res) => {
      //     console.log(res);
      //     alert('Product Price Added Successfully');
      this.ProductModelObj.code = this.productform.value.code;
      // if (!this.productform.valid) {
      //   return;
      // }
      // this.api.postproductcode(this.ProductModelObj).subscribe(
      //   (res) => {
      //     console.log(res);
      //     alert('Product Code Added Successfully');
      if (!this.productform.valid) {
        return;
      }

      this.api.postproduct(this.ProductModelObj).subscribe(
        (res) => {
          console.log(res);
          // alert('Product Added Successfully');
          this.toast.Showsuccess('Product Added succesfully')
          this.productform.reset();
          this.dialogref.close('Save');
         
        },
        (err) => {
          // alert('Something went wrong');
          this.toast.Showerror('Something went wrong')
          console.log(err);
        }
      );
    }
    //     },
    //     (err) => {
    //       alert('Something went wrong');
    //       console.log(err);
    //     }
    //   ); }); });
    else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productform.value, this.editProduct.id).subscribe(
      (res) => {
        console.log(res);
        // alert('Product Updated Successfully');
        this.toast.Showsuccess('Product Updated succesfully')
        this.productform.reset();
        this.dialogref.close('update');
      },
      (err) => {
        // alert('Something went wrong');
        this.toast.Showerror('Something went wrong')
        console.log(err);
      }
    );
  }
}
