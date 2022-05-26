import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  lDate:any
  acno:any
  // acno = ""
  // pswd = ""
  // amount = ""
  // acno1 = ""
  // pswd1 = ""
  // amount1 = ""

  //deposit group model creation
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  //withdraw group model creation
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  constructor(private ds: DataService, private fb: FormBuilder, private router:Router) {
    if(localStorage.getItem('currentUname')){
      this.user = JSON.parse(localStorage.getItem('currentUname')||'')
    }
    // this.user = this.ds.currentUname
     this.lDate= new Date()
  }
  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
           alert("please Log in")
           this.router.navigateByUrl("")
    }
  }
  deposit() {

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if (this.depositForm.valid) {
      //calling deposit function of dataService -asynchronous
      this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )
      // if (result) {
      //   alert(amount + "successfully deposit....and new balance is" + result)
      // }
    }
    else {
      alert("Invalid Form")
    }

  }

//withdraw
  withdraw() {

    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1
    if (this.withdrawForm.valid) {
      //calling withdraw function of dataService -asynchronous
       this.ds.withdraw(acno, pswd, amount)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )
      
    }
    else {
      alert("Invalid Form")
    }

  }


  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")  
    this.router.navigateByUrl("")}
  deleteAccount(){
   this.acno =JSON.parse(localStorage.getItem("currentAcno") || '')
  }
  cancel(){
    this.acno =""
  }

  delete(event:any){
    // alert("Delete Account "+event+" from parent")
//asynchronous
    this.ds.delete(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem("currentAcno")
        localStorage.removeItem("currentUname")
        localStorage.removeItem("token")
    
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )
  }
}
