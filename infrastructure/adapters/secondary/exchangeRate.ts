import { ExchangeRateService } from "../../../src/domain/ports/secondary/exchangeRate";
import { Moneda } from "../../../src/domain/entities/moneda"; 

export class ExchangeRate implements ExchangeRateService {

    constructor () {}

    obtenerTasa(origen: Moneda, destino: Moneda): Promise<number> {
        return Promise.resolve(2)
    };


    obtenerTodasLasTasas(): Promise<Record<string, number>> {
        return Promise.resolve({})
    };

}