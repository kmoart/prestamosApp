import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';


const routes: Routes = [
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'prestamos'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
