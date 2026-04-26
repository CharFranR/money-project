import { Conversion } from "../../entities/conversion";
import { Moneda } from "../../entities/moneda";


export interface RegisterPort {

    register(id: string, monedaOrigen: Moneda, monedaDestino: Moneda, montoOriginal: number, fecha: Date):Promise<Conversion>;

}