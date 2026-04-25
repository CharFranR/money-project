import { Moneda } from "../../../domain/entities/moneda";

export interface ExchangeRateService {
    obtenerTasa(origen: Moneda, destino: Moneda): Promise<number>;
    obtenerTodasLasTasas(base: Moneda): Promise<Record<string, number>>;
}