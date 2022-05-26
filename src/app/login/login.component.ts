import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
aim="your perfect banking partner"
accno="Account Number Please"
acno=""
pswd=""
//login group model creation
loginForm=this.fb.group({
//login array create
acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
 
 
})
// database:any={
//   1000:{acno:1000,uname:"varsha",password:1000,balance:5000},
//   1001:{acno:1001,uname:"remya",password:1001,balance:5000},
//   1002:{acno:1002,uname:"oyishie",password:1002,balance:5000},
// }
  constructor(private routerLogin:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  //acno change
  acnoChange(event:any)
  {
    console.log(event.target.value)
    this.acno=event.target.value
    
  }
  //paswd change
  pswdChange(event:any){
    this.pswd=event?.target.value
    console.log(this.pswd)
    
  }
  //login-using template reference variable
  // login(a:any,p:any)
  // {
  //   console.log(a);
    
  //   var acno=a.value
  //   var pswd=p.value
  //   let database=this.database
  //   if(acno in database){
  //     if(pswd==database[acno]["password"]){
  //       alert("Login successfully")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("user doesn't exists")
  //   }
  // }

// }

  // login function
  // login()
  // {
  //   var acno=this.acno
  //   var pswd=this.pswd
  //   let database=this.ds.database
  //   if(acno in database){
  //     if(pswd==database[acno]["password"]){
  //       alert("Login successfully")
  //       this.routerLogin.navigateByUrl("home")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("user doesn't exists")
  
  //   }
  // }
login()
{
  var acno= this.loginForm.value.acno
  var pswd =this.loginForm.value.pswd

  if(this.loginForm.valid){
    //asynchronous call - login 
  this.ds.login(acno,pswd)
  .subscribe((result:any)=>{
  if(result){
   localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
   localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
   localStorage.setItem('token',JSON.stringify(result.token))
   alert(result.message)
   this.routerLogin.navigateByUrl("home")
  }
  },
  (result)=>{
    alert(result.error.message)
  }
  )
  }
  else{
    alert("Invalid Form")
  }

  // if(result){
  //   alert("login successfully")
  //   this.routerLogin.navigateByUrl("home")
  // }
 
}
}
