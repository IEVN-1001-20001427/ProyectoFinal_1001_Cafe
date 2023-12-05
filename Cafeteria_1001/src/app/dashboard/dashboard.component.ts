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
  'total':number,
  'detalle':detFactura
}

interface detFactura {
  'id_factura':number,
  'id_producto':number,
  'cantidad':number,
  'precio':number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  listProducts: Producto[] = [];
  listTickets: Factura[] = [];

  constructor(private http:HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getProducts().subscribe(rs => {
      this.listProducts=rs;
    }, (error) => {
      console.log(error);
    })

    this.getTicket().subscribe(rs => {
      rs.forEach(r => {
        this.getDetailTicket(r.id_factura).subscribe(rsd => {
          this.listTickets.push(
            {
              'id_factura':r.id_factura,
              'fecha':r.fecha,
              'id_user':r.id_user,
              'precio':r.precio,
              'iva':r.iva,
              'total':r.total,
              'detalle': rsd
            }
          )
        }, (error) => {
          console.log(error);
        })
      });
    }, (error) => {
      console.log(error);
    })
  }

  delProduct(id:number){
    this.deleteProduct(id).subscribe(rs => {
      console.log(rs);
      this.listProducts = this.listProducts.filter(pr => pr.id_producto !== id);
    }, (error) => {
      console.log(error);
    })
  }

  deleteProduct(id:number){
    return this.http.delete<any>('http://127.0.0.1:5000/product/'+id);
  }

  getProducts(): Observable<Producto[]>{
    return this.http.get<Producto[]>('http://127.0.0.1:5000/products');
  }

  getProduct(id:number): Observable<Producto>{
    return this.http.get<Producto>('http://127.0.0.1:5000/product/'+id);
  }

  getTicket(): Observable<Factura[]>{
    return this.http.get<Factura[]>('http://127.0.0.1:5000/tickets');
  }

  getDetailTicket(id:number): Observable<detFactura>{
    return this.http.get<detFactura>('http://127.0.0.1:5000/ticket/'+id);
  }
}
