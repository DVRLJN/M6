import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interficies/apiResponse.interface';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
  standalone: true,
  providers: [HttpClient],
  imports: [IonicModule,HttpClientModule,CommonModule,ReactiveFormsModule],
})
export class PedidoComponent implements OnInit {
  pedidoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.pedidoForm = this.formBuilder.group({
      id_product: [''],
      id_address_delivery: [''],
      quantity: ['1'],
      user_id: [''] // Agregamos el campo user_id al formulario
    });
  }
  ngOnInit() {
  }
  
  onSubmit() {
    if (this.pedidoForm.valid) {
      console.log(this.pedidoForm.value);
      // Aquí es donde podrías hacer tu solicitud POST a la API de PrestaShop
    }
  }
}
