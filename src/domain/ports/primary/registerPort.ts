import { Conversion } from "../../entities/conversion";
import { Moneda } from "../../entities/moneda";


export interface RegisterPort {

    register(monedaOrigen: Moneda, monedaDestino: Moneda, montoOriginal: number, fecha?: Date):Promise<Conversion>;

}