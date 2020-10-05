import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  prestamos : UsuarioModel[] = [];
  cargando = false;
  capitalBaseS = '';

  constructor( private prestamosService: PrestamosService) { }

  ngOnInit(): void {

    this.cargando = true;
    this.prestamosService.obtenerPrestamos( )
    .subscribe( resp=>{
      console.log( resp );
      this.prestamos = resp;
      this.cargando = false;
      if(this.prestamos.length === 0){
          localStorage.setItem('capitalBase',GlobalConstants.capitalBase.toString());
      }
      this.capitalBaseS = localStorage.getItem('capitalBase');
      
    });
  }

  borrarUsuario( usuario: UsuarioModel, i: number ){

    Swal.fire('¿Are you sure?', `Are you sure to eliminate ${ usuario.nombre }`, 'question')
    .then( resp => {

      if( resp.value){
        
        this.prestamos.splice(i, 1);
        this.prestamosService.borrarUsuario( usuario.id )
        .subscribe();

      }
    });

  }

  pagarPrestamo( usuario: UsuarioModel){
      usuario.pagoCredito = true;
      let bancoBase = Number(localStorage.getItem('capitalBase'));
      bancoBase = bancoBase + usuario.valorSolicitado;
      localStorage.setItem('capitalBase',bancoBase.toString() );
      this.capitalBaseS = localStorage.getItem('capitalBase');

      let peticion: Observable<any>;

      peticion = this.prestamosService.actualizarUsuario( usuario );

      peticion.subscribe( resp =>{
        Swal.fire(usuario.nombre, 'was updated successfully ', 'success');
      });

  }

}
