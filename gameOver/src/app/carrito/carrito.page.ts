import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { CarritoContainerComponent } from './carrito-container/carrito-container.component';

@Component({
  selector: 'carritoComponent',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule,HeaderComponent, CarritoContainerComponent,CommonModule],
})
export class CarritoComponent{

  constructor(private router: Router) { }



}
