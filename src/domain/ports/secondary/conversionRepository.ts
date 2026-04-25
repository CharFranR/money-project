import { Conversion } from "../../entities/conversion";

export interface ConversionRepository {
    guardar(conversion: Conversion): Promise<void>;
    obtenerTodas(): Promise<Conversion[]>;
    buscarPorId(id:string): Promise<Conversion | null>
    buscarPorFecha(date:Date):Promise<Conversion[]>
    buscarPorMonedaOrigen(codigo:string):Promise<Conversion[]>
    buscarPorMonedaDestino(codigo:string):Promise<Conversion[]>
    eliminar(id:string):Promise<void>
    eliminarTodas():Promise<void>
}