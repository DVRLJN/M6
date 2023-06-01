import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';



@Component({
  selector: 'app-carrito-container',
  templateUrl: './carrito-container.component.html',
  styleUrls: ['./carrito-container.component.scss'],
  standalone: true,
  providers: [LocalStorageService,ApiService,HttpClient,SharedServiceService],
  imports: [IonicModule,HttpClientModule,CommonModule],
})
export class CarritoContainerComponent implements OnInit {

  productos: any[] = [];
  
  img:any;

  constructor(private localStorageService: LocalStorageService, private apiService:ApiService,private http: HttpClient,private router: Router, shared:SharedServiceService) { }
   
      ngOnInit() {
        const idProductos = this.localStorageService.getProductos();
        console.log('productos id: ', idProductos);

        const arrayIds = [];
        for (const obj of idProductos) {
          arrayIds.push(obj.id);
        }
        console.log('arrayIds:', arrayIds);
        arrayIds.forEach((id: any) => {
          this.apiService.getProductById(id).subscribe((product: any) => {
            console.log('Producto con ID', id, ':', product);
            this.productos.push(product)
          });
          console.log('total productos, ',this.productos);
        });
        

      }

      eliminarProducto(index:number){
        this.localStorageService.removeItem(index)
        this.productos.splice(index, 1);

    
      }
      getAddresses() {
        this.http.get('https://www.darlyncuevas.cat/prestashop/api/addresses?output_format=JSON&ws_key=8TMP3CAQ66M6U7C56QZTN8F5DVQVPJQL')
          .subscribe(response => {
            console.log('blablablab',response);
          });
    }
      realizarPedido() {
        this.router.navigate(['/pedido']);

/* 
        const pedido = {
            id_customer: 2,
            id_country: '6',
            alias: 'vvvv',
            lastname: 'Cuevas',
            firstname: 'Darlyn',
            address1: 'vvrvr',
            city: 'rrrr',
            dni: 'rrrrr',
        };
        
      
        const headers = { 'Content-Type': 'application/xml' };
        const xmlPedido = this.jsonToXml(pedido);
      
        this.http.post('https://www.darlyncuevas.cat/prestashop/api/addresses?output_format=JSON&ws_key=8TMP3CAQ66M6U7C56QZTN8F5DVQVPJQL', xmlPedido, { headers })
          .subscribe(response => {
            console.log(response);
          });
          this.getAddresses(); */
      }
      
      
      jsonToXml(json:any) {
        let xml = '';
        for (let key in json) {
          if (json.hasOwnProperty(key)) {
            let value = json[key];
            if (typeof value === 'object') {
              // Si el valor es un objeto, realiza la conversión de forma recursiva
              value = this.jsonToXml(value);
            }
            xml += `<${key}>${value}</${key}>`;
          }
        }
        console.log(xml);
        
        return `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink"><address>${xml}</address></prestashop>`;
      }
      
      isDuplicateProduct(index: number): boolean {
        for (let i = 0; i < index; i++) {
          if (this.productos[i].products[0].id === this.productos[index].products[0].id) {
            return true;
          }
        }
        return false;
      }
      

}
