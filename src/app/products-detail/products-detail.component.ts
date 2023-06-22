import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { InjectFlags } from '@angular/compiler/src/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductDialogEditComponent } from '../product-dialog-edit/product-dialog-edit.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductModel } from '../product-dialog/product.model';
import { NotifierService } from '../Services/notifier.service';
import { ProductService } from '../Services/product.service';

export interface ProductDetails{
  'prdtcode': number,
  'pdtname': string,
  'price':number,
  'action':boolean;
}
@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productCodeData: any;
  productForm!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  productData!: any;
  showUpdate = true;
  ELEMENT_DATA !: ProductDetails[];
  displayedColumns:String[] = ['prdtcode', 'pdtname', 'price', 'action'];
  dataSource = new MatTableDataSource<ProductDetails>(this.ELEMENT_DATA);
  constructor(
    private api: ProductService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private toast:NotifierService
  ) {
   
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    this.getProduct();
  }
  getProduct() {
    this.api
      .getProductDetail()
      .subscribe((res) => (
        this.productCodeData = res
        ));
  }
 
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ProductDialogEditComponent, dialogConfig);
  }
  editProduct(element: any) {
    this.showUpdate = true;
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: element,
    });
  }
  deleteProductDetail(id: number) {
    this.api.deleteProduct(id).subscribe(
      (res) => {
        console.log(res);
        // alert("Product Deleted Successfully");
        this.toast.Showsuccess('Product Deleted Successfully');
        this.loadpdtlist();
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }
    );
  }
  loadpdtlist(){
    this.api.getProductDetail().subscribe((res) => {
      this.productCodeData = res;
    });
  }
}
