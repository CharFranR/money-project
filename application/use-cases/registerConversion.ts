import { Moneda } from "../../src/domain/entities/moneda";
import { Conversion } from "../../src/domain/entities/conversion";
import { RegisterPort } from "../../src/domain/ports/primary/registerPort";
import { MonedaRepository } from "../../src/domain/ports/secondary/monedaRepository";

// Dependencias

export interface ExchangeRateService {
    obtenerTasa(origen: Moneda, destino: Moneda): Promise<number>;
}

export interface ConversionRepository {
    guardar(conversion: Conversion): Promise<void>;
    buscarPorId(id:string): Promise<Conversion | null>;
}

// Caso de uso

export class RegisterConversion implements RegisterPort {

    constructor (
        private exchangeRateService: ExchangeRateService,
        private conversionRepository: ConversionRepository,
        private monedaRepository: MonedaRepository
    ) {}

    async register (
        codeMonedaOrigen: string,
        codeMonedaDestino: string,
        montoOriginal: number,
        fecha?: Date,
    ): Promise<Conversion> {

        // Obetener mondaOrigen y monedaDestino a partir de los códigos

        if (codeMonedaOrigen === codeMonedaDestino ){
            throw new Error("No se puede convertir a la misma moneda");
        }

        if (!codeMonedaOrigen || !codeMonedaDestino){
            throw new Error("Campo requerido");
        }

        const monedaOrigen = await this.monedaRepository.buscarPorCodigo(codeMonedaOrigen);
        const monedaDestino = await this.monedaRepository.buscarPorCodigo(codeMonedaDestino);

        if (!monedaOrigen || !monedaDestino){
            throw new Error("Monedas no encontradas");
        }


        // Validaciones

        if (montoOriginal <= 0 ){
            throw new Error("El monto original no puede ser cero");
        }  

        
        const tasa = await this.exchangeRateService.obtenerTasa(monedaOrigen, monedaDestino);

        const montoConvertido = montoOriginal * tasa;

        const conversion = new Conversion(
            monedaOrigen, 
            monedaDestino, 
            montoOriginal, 
            montoConvertido, 
            tasa, 
            fecha || new Date ()
        );

        if (!conversion.esValida()){
            throw new Error('Negativo, esto es ilegalisimo')
        }

        await this.conversionRepository.guardar(conversion)

        return conversion

    }

}