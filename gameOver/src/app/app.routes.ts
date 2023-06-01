import { Routes } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
  { path: 'pedido', component: PedidoComponent },
];
