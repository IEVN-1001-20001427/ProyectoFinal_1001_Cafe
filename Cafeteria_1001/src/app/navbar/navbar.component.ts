import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  admin:boolean = false;
  client:boolean = false;

  constructor(private usr: AppComponent){}

  ngOnInit(): void {
    if(this.usr.getUsrtype() == "client"){
      this.client = true;
    }else{
      if(this.usr.getUsrtype() == "admin"){
        this.admin = true;
      }
    }
  }

  update(){

    this.admin = false;
    this.client = false;

    console.log("actualizando");
    
    if(this.usr.getUsrtype() == "client"){
      this.client = true;
    }else{
      if(this.usr.getUsrtype() == "admin"){
        this.admin = true;
      }
    }
  }

}
