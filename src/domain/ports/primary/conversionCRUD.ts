import { Conversion } from "../../entities/conversion";
import { Moneda } from "../../entities/moneda";


export class ConversionCRUD {

    register(id: string, monedaOrigen: Moneda, monedaDestino: Moneda, montoOriginal: number, fecha: Date):Promise<Conversion>;

    list(): Promise<Conversion[]>;
    
    getById(id: string): Promise<Conversion | null>;
    
    deleteById(id: string): Promise<void>;
    
    deleteAll(): Promise<void>;

}