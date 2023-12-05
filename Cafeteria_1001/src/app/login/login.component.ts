import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from '../app.component'
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

interface newUser {
  'correo':string,
  'contrasena':string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  userForm!: FormGroup;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private usr: AppComponent, private nv: NavbarComponent, private _router: Router) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      'correo':'',
      'contrasena':''
    })
  }

  iniciar(){
    this.getIn(this.userForm.value).subscribe(rs => {
      console.log(rs);
      this.usr.setUsr(rs);

      this.findOut(this.usr.getUsr().id_cliente).subscribe(rs => {
        if(rs == "Registro no encontrado"){
          this.usr.setUsrtype("client");
        }else{
          this.usr.setUsrtype("admin");
        }
      }, (error) => {
        console.log(error);
      })

      this.nv.update();
      if(this.usr.getUsrtype() == "admin"){
        this._router.navigateByUrl('dashboard');
      }else{
        this._router.navigateByUrl('menu');
      }

    }, (error) => {
      console.log(error);
    })
  }

  getIn(us: newUser){
    return this.http.post<any>('http://127.0.0.1:5000/login',us);
  }

  findOut(id:number){
    return this.http.get<any>('http://127.0.0.1:5000/find/'+id);
  }
  
}
