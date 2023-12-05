import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface usr {
  'id_cliente':number,
  'nombre':string,
  'ap_paterno':string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Café El Ajolote';

  usr!:usr;
  usrtype!:string;

  constructor(private http:HttpClient){}

  setUsr(u:usr){
    this.usr = u;
  }

  getUsr():usr{
    return this.usr
  }

  setUsrtype(t:string){
    this.usrtype = t;
  }

  getUsrtype():string{
    return this.usrtype
  }
}
