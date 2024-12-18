import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    {
      title: 'Inicio',
      icon: './assets/img/home.svg',
      url: './dashboard',
      submenu: [
      ]
    },
    {
      title: 'Clientes',
      icon: './assets/img/user.svg',
      // url: '',
      tipomenu: 'clientes',
      submenu: [
        { title: 'Todos los clientes', url: './clientes', alias: 'clientes' },
        { title: 'Nuevo cliente', url: './crear-cliente', alias: 'crear-cliente' }
      ]
    },
    {
      title: 'Platillos',
      icon: './assets/img/platillos.svg',
      // url: '',
      tipomenu: 'platillos',
      submenu: [
        { title: 'Todos los platillos', url: './platillos', alias: 'platillos'  },
        { title: 'Nuevo platillo', url: './crear-platillo', alias: 'crear-platillo' }
      ]
    },
    {
      title: 'Ordenes',
      icon: './assets/img/ordenes.svg',
      // url: '',
      tipomenu: 'ordenes',
      submenu: [
        { title: 'Todos las ordenes', url: './ordenes', alias: 'ordenes'  },
        { title: 'Nueva orden', url: './crear-orden', alias: 'crear-orden' }
      ]
    },
    {
      title: 'Categorías',
      icon: './assets/img/categorias.svg',
      // url: '',
      tipomenu: 'categorias',
      submenu: [
        { title: 'Todos las categorías', url: './categorias', alias: 'ordenes'  },
        { title: 'Nueva categoría', url: './crear-categoria', alias: 'crear-categoria' }
      ]
    },
    {
      title: 'Meseros',
      icon: './assets/img/meseros.svg',
      // url: '',
      tipomenu: 'meseros',
      submenu: [
        { title: 'Todos los meseros', url: './meseros', alias: 'meseros'  },
        { title: 'Nuevo mesero', url: './crear-mesero', alias: 'crear-mesero' }
      ]
    }
  ];

  constructor() { }
}
