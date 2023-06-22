import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../Services/customer.service';
import { NotifierService } from '../Services/notifier.service';
@Component({
  selector: 'app-salesdetail',
  templateUrl: './salesdetail.component.html',
  styleUrls: ['./salesdetail.component.css'],
})
export class SalesdetailComponent implements OnInit {
  // ELEMENT_DATA!:SalesDetails[] ;
  displayedColumns: string[] = ['date', 'pdtname', 'pdtprice', 'quantity'];
  // datasource=new MatTableDataSource<SalesDetails>(this.ELEMENT_DATA)

  customerData: any;
  salesform!: any;
  billingData: any = [];
  selected!: boolean;
  constructor(
    private customerapi: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NotifierService
  ) {}

  ngOnInit(): void {
    this.customerapi.getcustomer().subscribe((res) => {
      this.customerData = res;
    });

    this.salesform = this.fb.group({
      customername: new FormControl('', [Validators.required]),
    });
  }
  // displayedColumns = ['Date'];

  // selectMethod(event: any) {
  //   this.customerapi.getcustomerbyid(event.value).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.billingData = res;
  //     },
  //     (err) => {
  //       alert('Something went wrong');
  //       console.log(err);
  //     }
  //   );
  // }
  selectMethod(id: number) {
    this.selected = true;
    this.customerapi.getcustomerbyid(id).subscribe(
      (res) => {
        console.log(res);
        // if (res && res.length) {
        this.billingData = res;
        if (this.billingData.products && this.billingData.products.length) {
          this.billingData.products.map((val: any) => {
            val.date = this.billingData.date;
          });
          console.log(this.billingData);
        }
      },
      (err) => {
        // alert('Something went wrong');
        this.toast.Showerror('Something went wrong');
        console.log(err);
      }
    );
  }
  // }
  // selectMethod(id:number){
  //   let resp=this.customerapi.getcustomerbyid(id);
  //   console.log(resp)
  //   resp.subscribe (report => this.datasource.data = report as SalesDetails[])
  //   console.log(this.datasource.data)
  // }
}
