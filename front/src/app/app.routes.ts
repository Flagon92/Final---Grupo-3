import { Routes } from '@angular/router';

//compnents

import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { Clientes } from './admin/components/clientes/clientes.component';
import { CreateClienteComponent } from './admin/components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './admin/components/clientes/edit-cliente/edit-cliente.component';

import { PlatillosComponent } from './admin/components/platillos/platillos.component';
import { CreatePlatilloComponent } from './admin/components/platillos/create-platillo/create-platillo.component';
import { EditPlatilloComponent } from './admin/components/platillos/edit-platillo/edit-platillo.component';

import { AdminComponent } from './admin/components/admin/admin.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { NotFoundComponent } from './admin/shared/not-found/not-found.component';

import { OrdenesComponent } from './admin/components/ordenes/ordenes.component';
import { CreateOrdenComponent } from './admin/components/ordenes/create-orden/create-orden.component';
import { EditOrdenComponent } from './admin/components/ordenes/edit-orden/edit-orden.component';

import { CategoriasComponent } from './admin/components/categorias/categorias.component';
import { CreateCategoriaComponent } from './admin/components/categorias/create-categoria/create-categoria.component';
import { EditCategoriaComponent } from './admin/components/categorias/edit-categoria/edit-categoria.component';

import { MeserosComponent } from './admin/components/meseros/meseros.component';

// guard
import { authGuard } from './admin/guards/auth.guard';
import { CreateMeseroComponent } from './admin/components/meseros/create-mesero/create-mesero.component';
import { EditMeseroComponent } from './admin/components/meseros/edit-mesero/edit-mesero.component';


export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent, data: { title: 'Iniciar sesión' } },
            { path: 'register', component: RegisterComponent, data: { title: 'Resgistrarse' } },
        ]
    },
    {
        path: 'dashboard',
        component: AdminComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'clientes', component: Clientes, data: { title: 'Clientes' } },
            { path: 'crear-cliente', component: CreateClienteComponent, data: { title: 'Crear Cliente' } },
            { path: 'editar-cliente/:id', component: EditClienteComponent, data: { title: 'Editar Cliente' } },
            { path: 'platillos', component: PlatillosComponent, data: { title: 'Platillos' } },
            { path: 'crear-platillo', component: CreatePlatilloComponent, data: { title: 'Crear Platillo' } },
            { path: 'editar-platillo/:id', component: EditPlatilloComponent, data: { title: 'Editar Platillo' } },
            { path: 'ordenes', component: OrdenesComponent, data: { title: 'Ordenes' } },
            { path: 'crear-orden', component: CreateOrdenComponent, data: { title: 'Crear Orden' } },
            { path: 'editar-orden/:id', component: EditOrdenComponent, data: { title: 'Editar Orden' } },
            { path: 'categorias', component: CategoriasComponent, data: { title: 'Categorías' } },
            { path: 'crear-categoria', component: CreateCategoriaComponent, data: { title: 'Crear Categoría' } },
            { path: 'editar-categoria/:id', component: EditCategoriaComponent, data: { title: 'Editar Categoría' } },
            { path: 'meseros', component: MeserosComponent, data: { title: 'Meseros' } },
            { path: 'crear-mesero', component: CreateMeseroComponent, data: { title: 'Crear Mesero' } },
            { path: 'editar-mesero/:id', component: EditMeseroComponent, data: { title: 'Editar Mesero' } },
            { path: '**', component: NotFoundComponent },
        ],
    },
    { path: '**', component: NotFoundComponent },
];



