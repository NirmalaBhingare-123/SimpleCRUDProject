import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  userDetails:any;
  isEdit:Boolean=true;
  usersObj={
    name:'',
    mobile:'',
    email:'',
    pass:''
  }
  ngOnInit(): void {
    console.log('userdetails run');
    this.getUserDetails();
  }

  addUser(formObj: any){
    this.commonService.createUser(formObj).subscribe(data=>{
          this.getUserDetails();
    })
  }

  getUserDetails(){
   this.commonService.getUser().subscribe(data=>{
     this.userDetails=data;
   })
  }

  deleteUserDetails(user:any){
  this.commonService.deleteUser(user).subscribe(res=>{
  this.getUserDetails();
  })
  }

  editUserDetails(user:any){
    this.isEdit=false;
  this.usersObj=user;
  }

  updateUser(){
    this.isEdit=true;
    this.commonService.updateUser(this.usersObj).subscribe(()=>{
      this.getUserDetails();
      this.usersObj.name='';
      this.usersObj.mobile='';
      this.usersObj.email='';
      this.usersObj.pass='';
    })
  }
}
