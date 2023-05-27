import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductosComponent } from './productos/productos.component';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-store',
  templateUrl: 'store.page.html',
  styleUrls: ['store.page.scss'],
  standalone: true,
  imports: [IonicModule, ProductosComponent,HttpClientModule,HeaderComponent]
})
export class StoreComponent {

  constructor() {}
}
