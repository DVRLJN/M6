import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { forkJoin, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apiService';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../interficies/product.interface';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,HttpClientModule, FormsModule],
  providers: [ApiService]
})


export class ProductDetailPage implements OnInit {
  producto: Product | undefined = undefined;
  img:any;
  constructor(private route: ActivatedRoute, private apiService:ApiService) {
   }
   ngOnInit() {
    const productId: any = this.route.snapshot.paramMap.get("id");
  
    this.apiService.getProductById(productId).pipe(
      switchMap((product: any) => {
        const imageRequest = this.apiService.getImage(productId, product.id_default_image);
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
      this.producto = productWithImage;
      console.log('producto', this.producto);
    });
  }
}
