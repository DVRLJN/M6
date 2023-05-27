import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-ventas',
  templateUrl: 'ventas.page.html',
  styleUrls: ['ventas.page.scss'],
  standalone: true,
  imports: [IonicModule,HeaderComponent],
})
export class VentasComponent {
  constructor() {}
}
