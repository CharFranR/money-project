export class Moneda {
    id: number;
    nombre: string;
    codigo: string;

    constructor(id: number, nombre: string, codigo: string) {
        this.id = id
        this.nombre = nombre;
        this.codigo = codigo;
    }

   esCodigoValido (){
    return this.codigo.length >=3
   }

   esIgual (moneda:Moneda) {
    return this.codigo === moneda.codigo 
   }

   obtenerCodigo(){
    return this.codigo
   }

    obtenerNombre(){
    return this.nombre
   }
}