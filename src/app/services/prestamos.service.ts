import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private url = 'https://crudprestamos.firebaseio.com';

  constructor( private http: HttpClient ) {   

  }

  crearUsuario( usuario: UsuarioModel ){

    return this.http.post(`${ this.url }/prestamos.json`, usuario)
      .pipe(
          map( (resp: any ) => {
            usuario.id = resp.name;
            return usuario;
          })
      );
  }

  actualizarUsuario( usuario: UsuarioModel){

    const usuarioTemp = {
      ...usuario
    };

    delete usuarioTemp.id;

    return this.http.put(`${ this.url }/prestamos/${ usuario.id }.json`, usuarioTemp );
  }

  borrarUsuario( id:string ){
    return this.http.delete(`${ this.url }/prestamos/${ id }.json`);
  }

  obtenerUsuario( id: string ){
      return this.http.get(`${ this.url }/prestamos/${ id }.json`);
  }

  obtenerPrestamos(){

    return this.http.get(`${ this.url}/prestamos.json`)
      .pipe(
        map( resp => this.crearArreglo( resp )),
        delay(1500)
      );

  }

  private crearArreglo( prestamosObj: object ){
    const prestamos: UsuarioModel[] = [];


    if(prestamosObj === null ){ return []; }

    Object.keys( prestamosObj ).forEach( key => {
          const usuario: UsuarioModel = prestamosObj[key];
          usuario.id = key;

          prestamos.push( usuario );
    });

    return prestamos;
  }
}
