import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { product } from '../bill-detail/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductModel } from '../product-dialog/product.model';
import { CustomerService } from '../Services/customer.service';
import { ProductService } from '../Services/product.service';
import { BillDetailModel } from './billdetail.model';

@Component({
  selector: 'app-billdetail',
  templateUrl: './billdetail.component.html',
  styleUrls: ['./billdetail.component.css']
})
export class BilldetailComponent implements OnInit {
  productCode: any;
  productCodeDetail: any;
  productCodeData!: product[];
  ProductModelObj: ProductModel = new ProductModel();

  filteredpdt!: product[];
  form1 = new FormGroup({});

  hide: boolean = false;
  product : any;
  customerform!: any;
  CustomerModelObj: BillDetailModel = new BillDetailModel();
  ProductData!: any;
  detail: any;
  productForm!: FormGroup;
  productCodeFilter: any;
 CustomerData: any = [];
  pdtnamecode: any = [];
  selected!: boolean;
  pdtprice: any = [];
  showrequire!: boolean;
  addnew!: boolean;
  pdtnc: any;
  constructor(
    private api: ProductService,
    private customer: CustomerService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.getProduct();
    this.api.getProductDetail().subscribe((res) => {
      this.productCodeData = res;
    });

    this.customerform = this.fb.group({
      date: new FormControl(),
      name: new FormControl(),
      mobile: new FormControl(),
      address: new FormControl(),
      products: new FormArray([this.pdtform()]),
      //   'products': new FormArray([
      // this.fb.group({
      //   'pdtcode':new FormControl(),
      //   'pdtname': new FormControl(),
      //   'quantity': new FormControl(),
      //   'price': new FormControl(),
      //   'total': new FormControl()
      // })
      // ])
    });
    // this.productForm = this.fb.group({
    //   products: new FormArray([this.pdtform()]),

    // });

    this.product  = this.getControls(this.customerform,'products');
  }
  pdtform(): FormGroup {
    return this.fb.group({
      pdtcode: new FormControl(),
      pdtname: new FormControl(),
      quantity: new FormControl(),
      pdtprice: new FormControl(),
      total: new FormControl(),
    });
  }
  
  // get products(){
  //   return(<FormArray>this.form1.get('products'));
  // }
  get productsArray(): FormArray {
    return this.customerform.get('products') as FormArray;
  }
  // addProduct(){
  //   this.products.push(this.customer.getProductForm());
  // }
  getControls(form: FormGroup, key: string) {
    return (<FormArray>form.controls[key]).controls;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ProductDialogComponent, dialogConfig);
  }
  //  postcustomerDetails() {
  //   this.CustomerModelObj.date = this.customerform.value.date;
  //   this.CustomerModelObj.name = this.customerform.value.name;
  //   this.CustomerModelObj.mobile = this.customerform.value.mobile;
  //   this.CustomerModelObj.address = this.customerform.value.address;
  //   if (!this.customerform.valid) {
  //     return;
  //   }
  //   this.customer.postcustomer(this.CustomerModelObj)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert("Product Added Successfully");
  //       let ref = document.getElementById("cancel");
  //       ref?.click();
  //       this.customerform.reset();

  //     }, err => {
  //       alert("Something went wrong");
  //       console.log(err);
  //     })
  // }
  // displayedColumns = ['prdtcode', 'pdtname', 'quantity', 'price', 'total'];
  // displayedColumns= ['pdtname','quantity'];

  // dataSource:MatTableDataSource<any>=new MatTableDataSource<any>();
  // displayedColumns: string[] = ['code', 'name', 'quantity', 'price','total'];
  // dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<product> | any;

  // addData() {
  //    const randomElementIndex = Math.floor(Math.random() * this.productCodeData.length);
  //   this.productCodeData.push(this.productCodeData[randomElementIndex]);
  //   this.table.renderRows();

  // }

  // removeData() {
  //   this.dataSource.pop();
  //   this.table.renderRows();
  // }

  addProduct() {
    this.showrequire = true;
    this.addnew = true;
  
    this.productsArray.push(this.pdtform());
  }

  // getProduct() {
  //  this.api.getProductDetail().subscribe((res) => {
  //     this.productCodeData=res;
  //     // this.dropDownData=[]
  //     //   this.productCodeData.map((res)=>{
  //     //     if(res.name){
  //     //       this.dropDownData.push(res.name)
  //     //     }
  //     //     console.log(this.dropDownData);
  //       })

  //     // this.productCodeData = res;
  //     console.log(this.productCodeData);
  //     //     for(let i=0;i<this.productCodeData.length;i++){
  //     //    this.productCodeFilter =this.productCodeData[i].name;
  //     //    console.log(this.productCodeFilter)
  //     //     }
  //     //     this.filteredpdt= this.productCodeFilter;
  //     // console.log(this.filteredpdt)
  //   // });

  //   // this.dataSource=new MatTableDataSource<any>(this.productCodeData);)
  // }

  // getfilteredpdtname(){
  //   this.filteredpdt = this.productCodeData.filter(resp =>resp.name);
  //   console.log(this.filteredpdt)
  // }
  // onSelect(productCodeData:any){
  //     console.log(productCodeData.target.value);
  //   this.api.getProductCodeDetail().subscribe(res => {
  //       this.productCodeDetail = res;
  //       this.productCode = this.productCodeDetail.filter((e: any) => e.id == productCodeData.target.value);
  //       console.log(this.productCode);
  //     })
  //   }
  // loadoption(){
  //   this.getProduct();
  // }
  
  someMethod(event: any, i: any) {
    this.selected=true;
    console.log(event.value);
    debugger
    // let input  = document.querySelector('input[name['+i+']]');
    // input.value = event.value;

    this.customerform.controls.products.value[i].pdtname = event.value.name;
    // console.log(this.customerform.controls.products.value[i].pdtname)
    // this.CustomerData[i]=this.customerform.controls.products.value[i].pdtname;
    // console.log(this.CustomerData)
    // this.CustomerData.push(this.CustomerModelObj);
    // this.CustomerModelObj.pdtname= this.customerform.controls.products.value[i].pdtname;

    this.customerform.controls.products.value[i].pdtcode = event.value.code;
    this.customerform.controls.products.value[i].pdtprice = event.value.price;
    // this.CustomerModelObj.price = this.customerform.controls.products.value[i].price;
    // this.CustomerModelObj.pdtcode = this.customerform.controls.products.value[i].pdtcode;
    
// this.productsArray.value[i].pdtcode=event.value.code;
// console.log(this.productsArray.value[i].pdtcode);
// this.productsArray.value[i].price=event.value.price;
    this.product = this.customerform.controls.products.value
  }
  //   someMethod(value: any) {
  //  this.selected=true;
  //     this.pdtnamecode=value.code;
  //     this.pdtprice=value.price;
  //     console.log("selected value",[this.pdtnamecode]);
  //     // console.log('id is',value)
  //     // console.log("selected element", element);
  //     // element.code = value;

  //   }
  // postproductform(){
  //   this.ProductModelObj.pdtname = this.productForm.value.pdtname;
  //   this.ProductModelObj.quantity = this.productForm.value.quantity;
  //   this.api.postproductform(this.ProductModelObj)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert("Product Added Successfully");

  //     // this.productForm.reset();

  //     }, err => {
  //       alert("Something went wrong");
  //       console.log(err);
  //     })

  // }
  postCustomerDetails(){
    this.CustomerModelObj.date = this.customerform.value.date;
    this.CustomerModelObj.name = this.customerform.value.name;
    this.CustomerModelObj.mobile = this.customerform.value.mobile;
    this.CustomerModelObj.address = this.customerform.value.address;
    this.CustomerModelObj.quantity=this.customerform.value.quantity;
    this.CustomerModelObj.pdtcode  = this.productsArray.value.pdtcode
    this.CustomerModelObj.pdtprice  = this.productsArray.value.pdtprice

    console.log(this.productsArray.value.quantity)

console.log(this.CustomerData);
    this.customer.postcustomer(this.CustomerModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Order Added Successfully');

        this.customerform.reset();
        
      },
      (err) => {
        alert('Something went wrong');
        console.log(err);
      }
    );}
  }
 

