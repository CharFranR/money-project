import { Moneda } from "../../src/domain/entities/moneda";
import { Conversion } from "../../src/domain/entities/conversion";
import { RegisterPort } from "../../src/domain/ports/primary/registerPort";

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
        private conversionRepository: ConversionRepository
    ) {}

    async register (
        id: string,
        monedaOrigen: Moneda,
        monedaDestino: Moneda,
        montoOriginal: number,
        fecha?: Date,
    ): Promise<Conversion> {

        // Validaciones

        if (!id || id.trim() === "") {
            throw new Error("Opa, id vacío");
        }

        if (montoOriginal <= 0 ){
            throw new Error("El monto original no puede ser cero");
        }  

        if (!monedaOrigen || !monedaDestino){
            throw new Error("Necesito las dos monedas para hacer la conversion");
        }

        // Reglas de negocio

        if (monedaDestino.obtenerCodigo() === monedaOrigen.obtenerCodigo()){
            throw new Error("No se puede convertir a la misma moneda");
        }

        const id_exists = await this.conversionRepository.buscarPorId(id)

        if (id_exists) {
            throw new Error(`Conversion con id ${id} previamente existente`);
        }

        const tasa = await this.exchangeRateService.obtenerTasa(monedaOrigen, monedaDestino);

        const montoConvertido = montoOriginal * tasa;

        const conversion = new Conversion(
            id, 
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