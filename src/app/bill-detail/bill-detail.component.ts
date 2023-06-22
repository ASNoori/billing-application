import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { BillDetailModel } from './bill-detail.model';
import { CustomerService } from '../Services/customer.service';
import { ProductService } from '../Services/product.service';
import { product } from './product';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../product-dialog/product.model';
import { elementAt } from 'rxjs';
import { NotifierService } from '../Services/notifier.service';
@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css'],
})
export class BillDetailComponent implements OnInit {
  productCode: any;
  productCodeDetail: any;
  productCodeData!: product[];
  ProductModelObj: ProductModel = new ProductModel();

  filteredpdt!: product[];
  form1 = new FormGroup({});

  hide: boolean = false;
  product: any;
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
  deleted!: boolean;
  constructor(
    private api: ProductService,
    private customer: CustomerService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private toast: NotifierService
  ) {}

  ngOnInit(): void {
    // this.getProduct();
    this.api.getProductDetail().subscribe((res) => {
      this.productCodeData = res;
    });

    this.customerform = this.fb.group({
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
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

    this.product = this.getControls(this.customerform, 'products');
  }
  pdtform(): FormGroup {
    return this.fb.group({
      pdtcode: new FormControl(),
      pdtname: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      pdtprice: new FormControl(),
      total: new FormControl(),
    });
  }

  // get products(){
  //   return(<FormArray>this.form1.get('products'));
  // }
  get products(): FormArray {
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

    this.products.push(this.pdtform());
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
  loadpdt() {
    this.api.getProductDetail().subscribe((res) => {
      this.productCodeData = res;
    });
  }
  someMethod(event: any, i: any) {
    this.selected = true;
    console.log(this.productCodeData);

    // let input  = document.querySelector('input[name['+i+']]');
    // input.value = event.value;

    this.customerform.controls.products.value[i].pdtname = event.name;
    // console.log(this.customerform.controls.products.value[i].pdtname)
    // this.CustomerData[i]=this.customerform.controls.products.value[i].pdtname;
    // console.log(this.CustomerData)
    // this.CustomerData.push(this.CustomerModelObj);
    // this.CustomerModelObj.pdtname= this.customerform.controls.products.value[i].pdtname;

    this.customerform.controls.products.value[i].pdtcode = event.code;
    this.customerform.controls.products.value[i].pdtprice = event.price;
    // this.CustomerModelObj.price = this.customerform.controls.products.value[i].price;
    // this.CustomerModelObj.pdtcode = this.customerform.controls.products.value[i].pdtcode;

    // this.productsArray.value[i].pdtcode=event.value.code;
    // console.log(this.productsArray.value[i].pdtcode);
    // this.productsArray.value[i].price=event.value.price;
    this.product = this.customerform.controls.products.value;
    console.log('this.customerform', this.customerform);
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
  postCustomerDetails() {
    console.log(this.customerform.value.products.values.pdtcode);

    this.CustomerModelObj.date = this.customerform.value.date;
    this.CustomerModelObj.name = this.customerform.value.name;
    this.CustomerModelObj.mobile = this.customerform.value.mobile;
    this.CustomerModelObj.address = this.customerform.value.address;
    // this.CustomerModelObj.quantity = this.customerform.value.quantity;
    // this.CustomerModelObj.pdtname= this.customerform.controls.products.value.pdtname;
    // this.CustomerModelObj.pdtcode = this.products.value.pdtcode;
    // this.CustomerModelObj.pdtprice = this.products.value.pdtprice;
    this.CustomerModelObj.products = this.products.value;

    this.CustomerModelObj.total = this.products.value.total;
    this.CustomerModelObj.grandtotal = this.products.value.grandtotal;

    console.log(this.products.value.quantity);

    console.log(this.CustomerData);
    this.customer.postcustomer(this.CustomerModelObj).subscribe(
      (res) => {
        if (this.customerform.valid) {
          console.log(res);
          this.toast.Showsuccess('Order Added Successfully');

          this.customerform.reset();
          this.router.navigate(['/sales']);
        }
      },
      (err) => {
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }
    );
  }

  quantityChange(eve: any, i: any) {
    console.log('eve', eve);
    // console.log(this.productsArray.value.pdtprice)
    // this.productsArray.value.total= this.productsArray.value.pdtprice * this.customerform.value.quantity
    // console.log(this.productsArray.value.total)
    const findProduct = this.productCodeData.find(
      (e: any) => e.name === eve.value.pdtname
    );
    if (findProduct) {
      const event = {
        name: findProduct.name,
        price: findProduct.price,
        code: findProduct.code,
        id: findProduct.id,
      };
      this.someMethod(event, i);
      this.product[i].total =
        this.product[i].quantity * this.product[i].pdtprice;
      this.product.grandtotal = this.product[i].total + this.product.total;
    }
    // console.log('this.customerform',this.customerform);

    // eve.stopPropagation()
  }
  calculateGrandtotal() {
    this.product.grandtotal = 0;
    for (let i = 0; i < this.product.length; i++) {
      this.product.grandtotal = this.product[i].total + this.product.grandtotal;
    }
    return this.product.grandtotal;
  }
  deleteRow(i: any) {
    if (this.products.length > 1) {
      if (this.selected) {
        this.customerform.get('products').controls.splice(i, 1);
      }
      this.product.splice(i, 1);
      this.calculateGrandtotal();
    } else {
      this.toast.Showwarning('Default row should not be deleted');
    }
  }
  // deleteProductDetail(i:number){
  //   this.api.deleteList(i).subscribe(res => {
  //     console.log(res);
  //     alert("Product Deleted Successfully");

  //   }, err => {
  //     alert("Something went wrong");
  //     console.log(err);
  //   })
  // }
}
