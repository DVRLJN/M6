import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  goInicio(){
    console.log('inicio');
    this.router.navigate(['tabs/inicio']);
  }
}
