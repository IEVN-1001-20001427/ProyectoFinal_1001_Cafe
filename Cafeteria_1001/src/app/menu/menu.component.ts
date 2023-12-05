import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

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

interface Factura {
  'id_factura':number,
  'fecha':Date,
  'id_user':number,
  'precio':number,
  'iva':number,
  'total':number
}

interface detFactura {
  'nombre':string,
  'cantidad':number,
  'precio':number
}

interface detDeseo {
  nombre:string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  listProducts: Producto[] = [];
  listCompra:detFactura[] = [];
  listDeseo:string[] = [];
  ffct:Factura = {
    'id_factura':123,
    'fecha':new Date(),
    'id_user':1,
    'precio':0,
    'iva':0,
    'total':0
  }

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.getProducts().subscribe(rs => {
      this.listProducts=rs;
    }, (error) => {
      console.log(error);
    })
  }

  getProducts(): Observable<Producto[]>{
    return this.http.get<Producto[]>('http://127.0.0.1:5000/products');
  }

  desear(nm:string){
    if(!this.listDeseo.includes(nm)){
      this.listDeseo.push(nm)
    }
  }

  dejarDesear(nm:string){
    this.listDeseo = this.listDeseo.filter(pr => pr !== nm);
  }

  agregarcarro(nm:string,n:number,p:number){
    this.listCompra.push({'nombre':nm,'cantidad':n,'precio':p})

    this.calculate();
  }

  quitarcarro(nm:string){
    this.listCompra = this.listCompra.filter(pr => pr.nombre !== nm);

    this.calculate();
  }

  calculate(){
    this.ffct.precio = 0;
    this.ffct.iva = 0;
    this.ffct.total = 0;

    this.listCompra.forEach(element => {
      this.ffct.precio += Number(element.precio);
    });

    this.ffct.iva = this.ffct.precio * .16;
    this.ffct.total = this.ffct.iva = this.ffct.precio;

  }
}
