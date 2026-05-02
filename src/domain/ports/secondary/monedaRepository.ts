import { Moneda } from "../../../domain/entities/moneda";

export interface MonedaRepository {
    buscarPorCodigo(code:string): Promise<Moneda | null>;
}