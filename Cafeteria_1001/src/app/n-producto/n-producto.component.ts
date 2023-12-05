import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';

interface Producto {
  'id_producto':number,
  'nombre':string,
  'precio_siva':number,
  'descripcion':string,
  'inventario':number,
  'imagen':string,
  'marca':string,
  'provedor':string
}

@Component({
  selector: 'app-n-producto',
  templateUrl: './n-producto.component.html',
  styleUrls: ['./n-producto.component.css']
})
export class NProductoComponent implements OnInit{

  productForm!: FormGroup;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private fat: DashboardComponent) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'id_producto':'',
      'nombre':'',
      'precio_siva':'',
      'descripcion':'',
      'inventario':'',
      'imagen':'',
      'marca':'',
      'provedor':''
    })
  }

  create(){
    let a = false;

    this.fat.listProducts.forEach(element => {
      if(element.id_producto == this.productForm.controls['id_producto'].value){
        a = true;
      }
    });

    if(a){
      this.editProduct(this.productForm.value).subscribe(rs => {
        console.log(rs);      
      }, (error) => {
        console.log(error);
      })

      let idx = this.fat.listProducts.findIndex((pd) => pd.id_producto === this.productForm.controls['id_producto'].value)
      if(idx !== -1){
        this.fat.listProducts[idx] = this.productForm.value
      }
    }else{
      this.addProduct(this.productForm.value).subscribe(rs => {
        console.log(rs);      
      }, (error) => {
        console.log(error);
      })
      
      this.fat.listProducts.push(this.productForm.value);
    }
    this.productForm.reset();    
  }

  addProduct(prd:Producto){
    return this.http.post<any>('http://127.0.0.1:5000/product',prd);
  }

  editProduct(prd:Producto){
    return this.http.put<any>('http://127.0.0.1:5000/product/'+prd.id_producto,prd);
  }

}
