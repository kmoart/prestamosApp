import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { PrestamosService } from '../../services/prestamos.service';

import Swal from 'sweetalert2';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = new UsuarioModel();
  valorAceptado = true;
  valorExcedebase = false;
  capitalBaseS = GlobalConstants.capitalBase.toString();
  capital = Number(this.capitalBaseS);
  capitalBasenumber :Number;
  

  constructor( private prestamosService: PrestamosService,
                private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo'){
      this.prestamosService.obtenerUsuario( id )
      .subscribe( (resp: UsuarioModel )=>{
        this.usuario = resp;
        this.usuario.id = id;
        console.log( resp );
      });
    }
  }

  guardar( form: NgForm ){

    if( form.invalid ){
      console.log('Formulario no válido');
      return;

    }

    if( this.usuario.valorSolicitado < 10000 || this.usuario.valorSolicitado > 1000000){
        this.valorAceptado = false;
        return;
    }else{
        this.valorAceptado = true;
    }

    let capitalBase= localStorage.getItem('capitalBase');
    this.capitalBasenumber= Number(capitalBase);

    if(this.usuario.valorSolicitado > this.capitalBasenumber){
      this.valorExcedebase = true;
      return;
    }else{
      this.valorExcedebase = false;
    }

    
    Swal.fire('Espere', 'Guardando información', 'info');
    Swal.showLoading();

     
    let peticion: Observable<any>;

    if( this.usuario.id){
      peticion = this.prestamosService.actualizarUsuario( this.usuario );

      if(this.usuario.estadoCredito){

        let capitalBase= localStorage.getItem('capitalBase');
        let capitalBasenumber= Number(capitalBase);
        this.capital = capitalBasenumber - this.usuario.valorSolicitado;
        this.capitalBaseS = this.capital.toString();
        localStorage.setItem('capitalBase', this.capitalBaseS);
        console.log(this.capitalBaseS);  

      }       
    }

    else{
      peticion= this.prestamosService.crearUsuario( this.usuario ); 
      
       if(this.usuario.estadoCredito){
          let capitalBase= localStorage.getItem('capitalBase');
          let capitalBasenumber= Number(capitalBase);
          this.capital = capitalBasenumber - this.usuario.valorSolicitado;
          this.capitalBaseS = this.capital.toString();
          localStorage.setItem('capitalBase', this.capitalBaseS);
          console.log(this.capitalBaseS);   
       }
    }

    peticion.subscribe( resp =>{
        Swal.fire(this.usuario.nombre, 'Se actualizó correctamente', 'success');
    });

  }

}
