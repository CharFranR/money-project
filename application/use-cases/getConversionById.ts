import { Conversion } from "../../src/domain/entities/conversion"


// Dependencias

export interface ConversionRepository {
    buscarPorId(id:string): Promise<Conversion | null>;
}


// Caso de uso

export class GetConversionById {

    constructor (
        private conversionRepository: ConversionRepository
    ) {};


    async ejecutar(id:string): Promise<Conversion | null> {
        const target: Conversion | null = await this.conversionRepository.buscarPorId(id);
        return target;
    }
}