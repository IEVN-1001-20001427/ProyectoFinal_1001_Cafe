import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface newUser {
  'id_user'?:number,
  'correo':string,
  'contrasena':string
}

interface cliente {
  'id_cliente':number,
  'nombre':string,
  'ap_paterno':string,
  'ap_materno':string,
  'telefono':string,
  'num_tarjeta':string,
  'id_user':number
}

@Component({
  selector: 'app-e-producto',
  templateUrl: './e-producto.component.html',
  styleUrls: ['./e-producto.component.css']
})
export class EProductoComponent implements OnInit{

  userForm!: FormGroup;
  nclientForm!: FormGroup;

  constructor(private http:HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      'id_user':'',
      'correo':'',
      'contrasena':''
    })

    this.nclientForm = this.formBuilder.group({
      'id_user':'',
      'correo':'',
      'contrasena':'',
      'nombre':'',
      'ap_paterno':'',
      'ap_materno':'',
      'telefono':'',
      'num_tarjeta':''
    })
  }

  create(){
    this.addClient(this.nclientForm.value).subscribe(rs => {
      console.log(rs);
      this.nclientForm.reset();
    }, (error) => {
      console.log(error);
    })
  }

  addClient(prd:cliente){
    return this.http.post<any>('http://127.0.0.1:5000/newUser',prd);
  }

}
