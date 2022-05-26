import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
 transactions:any
 acno:any

  constructor(private ds:DataService) { 

    this.acno= JSON.parse(localStorage.getItem('currentAcno')||'')
    //asynchronous
    this.transactions =this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      if(result){
       this.transactions = result.transaction
      }
    },
    result=>{
      alert(result.message)
    }
    )
    console.log(this.transactions);
    
  }


  ngOnInit(): void {
  }

}
