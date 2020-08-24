

export class UsuarioModel{

    id:string;
    nombre: string;
    correo: string;
    cedula: number;
    valorSolicitado: number;
    estadoCredito: boolean;
    pagoCredito: boolean;

    constructor(){

        const numero = Math.random();
        if( numero >= 0.5){
            this.estadoCredito = true;
        }
        
        else{
            this.estadoCredito = false;
        }
    
        this.pagoCredito= false;            
        
    }
}