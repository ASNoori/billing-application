import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ProductService } from '../Services/product.service';
import { product } from '../bill-detail/product';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  productCode: any;
  productCodeDetail: any;


   constructor(private api:ProductService) { }
   productCodeData!:product[];
  
  ngOnInit(): void {
    this.getProduct();
  }
  displayedColumns= ['code', 'name', 'quantity', 'price','total'];
  // dataSource:MatTableDataSource<any>=new MatTableDataSource<any>();
  // displayedColumns: string[] = ['code', 'name', 'quantity', 'price','total'];
  // dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<product> | any;

  addData() {
     const randomElementIndex = Math.floor(Math.random() * this.productCodeData.length);
    this.productCodeData.push(this.productCodeData[randomElementIndex]);
    this.table.renderRows();

  }

  // removeData() {
  //   this.dataSource.pop();
  //   this.table.renderRows();
  // }

  
  getProduct(){
    this.api.getProductDetail().subscribe(res => {
      this.productCodeData = res;
console.log(this.productCodeData);
// this.dataSource=new MatTableDataSource<any>(this.productCodeData);
    })
  }
  onSelect(productCodeData:any){
      console.log(productCodeData.target.value);
    this.api.getProductCodeDetail().subscribe(res => {
        this.productCodeDetail = res;
        this.productCode = this.productCodeDetail.filter((e: any) => e.id == productCodeData.target.value);
        console.log(this.productCode);
      })
    }
  }


