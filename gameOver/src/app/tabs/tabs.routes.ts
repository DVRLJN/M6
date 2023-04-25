import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../inicio/inicioComponent.page').then((m) => m.inicioComponent),
      },
      {
        path: 'store',
        loadComponent: () =>
          import('../store/storeComponent.page').then((m) => m.StoreComponent),
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('../ventas/ventas.page').then((m) => m.VentasComponent),
      },
      {
        path:'carrito',
        loadComponent:() =>
        import('../carrito/carrito.page').then((m) => m.CarritoComponent),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];


