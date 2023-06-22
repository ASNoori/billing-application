export class BillDetailModel{
    date!: Date ;
    name: string = '';
   mobile!: number;
   address: string='';
   pdtname: string='';
   pdtcode!: number;
   pdtprice!: number;
   quantity!:number;
   total!:number;
   products!:any[];
   grandtotal!: number;
} 