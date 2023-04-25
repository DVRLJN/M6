import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'inicioComponent',
  templateUrl: 'inicioComponent.page.html',
  styleUrls: ['inicioComponent.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,HeaderComponent],
})
export class inicioComponent {
  constructor(private router: Router) {}

}
