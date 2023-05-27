import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-carrito-container',
  templateUrl: './carrito-container.component.html',
  styleUrls: ['./carrito-container.component.scss'],
  standalone: true,
  providers: [ApiService],
  imports: [IonicModule,HttpClientModule,CommonModule],
})
export class CarritoContainerComponent implements OnInit {

  productos: any[] = [];
  private productosSubject = new Subject<void>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.actualizarProductos();
    this.productosSubject.subscribe(() => {
      this.actualizarProductos();
    });
  }

  private actualizarProductos() {
    const productosStr = localStorage.getItem('productos');
    this.productos = typeof productosStr === 'string' ? JSON.parse(productosStr) : [];
    console.log('productos', this.productos);
  }


}
