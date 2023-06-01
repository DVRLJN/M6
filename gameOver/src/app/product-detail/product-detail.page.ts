import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { forkJoin, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apiService';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../interficies/product.interface';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../services/local-storage-service.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,HttpClientModule, FormsModule,HeaderComponent],
  providers: [ApiService,LocalStorageService]
})


export class ProductDetailPage implements OnInit {
  producto: Product | undefined = undefined;
  img:any;
  purchased: boolean = false;
  constructor(private route: ActivatedRoute, private apiService:ApiService,private localStorageService: LocalStorageService) {
   }
   ngOnInit() {
    const productId: any = this.route.snapshot.paramMap.get("id");
  
    this.apiService.getProductById(productId).pipe(
      switchMap((product: any) => {
        const producto = product.products
        console.log(producto);
        const idImage = producto[0].id_default_image
        const imageRequest = this.apiService.getImage(productId, idImage);
        return imageRequest.pipe(
          map((imageResponse: Blob) => {
            const imageLink = URL.createObjectURL(imageResponse);
            this.img = imageLink; 
            console.log(this.img);
            // Agrega la propiedad imageLink al objeto product
            return product;
          })
        );
      })
    ).subscribe((productWithImage: any) => {
      this.producto = productWithImage.products[0];
      console.log('producto', this.producto);
    });
  }

  comprar(producto: any) {
    this.localStorageService.setProductos(producto)
    let productosGuardados = [];
    const datosLocalStorage = localStorage.getItem('productos');
  
    if (datosLocalStorage) {
      try {
        productosGuardados = JSON.parse(datosLocalStorage);
      } catch (e) {
        console.error('Error al analizar los datos del LocalStorage:', e);
      }
    }
  
    productosGuardados.push({id: producto.id});
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    this.purchased = true;
  }
}
