import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { forkJoin, map, switchMap } from 'rxjs';
import { PrestashopService } from '../services/prestashopService';



@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule,CommonModule],
  providers: [PrestashopService]
})
export class ExploreContainerComponent {
  
  products: any;
  constructor(private prestashopService: PrestashopService) { }

  ngOnInit() {
    this.prestashopService.getProducts().subscribe(data => {
      const productRequests = data.products.map((product:any) => {
        return this.prestashopService.getImage(product.id, product.id_default_image).pipe(
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
  
  
}


