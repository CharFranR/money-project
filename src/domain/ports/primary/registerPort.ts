import { Conversion } from "../../entities/conversion";
import { Moneda } from "../../entities/moneda";


export interface RegisterPort {

    register(codeMonedaOrigen: string, codeMonedaDestino: string, montoOriginal: number, fecha?: Date):Promise<Conversion>;

}