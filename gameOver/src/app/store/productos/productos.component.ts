import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { forkJoin, map, switchMap } from 'rxjs';
import { ApiService } from '../../services/apiService';
import { Router } from '@angular/router';


@Component({
  selector: 'productos-container',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule,CommonModule],
  providers: [ApiService]
})
export class ProductosComponent {
  
  products: any;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getProducts().subscribe(data => {
      const productRequests = data.products.map((product:any) => {
        return this.apiService.getImage(product.id, product.id_default_image).pipe(
          map((response: Blob) => {
            const imageLink = URL.createObjectURL(response);     
            return { ...product, imageLink };
          })
        );
      });
      forkJoin(productRequests).subscribe(products => {
        this.products = products;
        console.log('productoooo', this.products);
      });
    });
  }

  mostrarDetalle(producto: any) {
    const productId = producto.id;
    this.router.navigate(['/product-detail', productId]);
  }
  
  
}


