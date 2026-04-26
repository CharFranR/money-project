import { Conversion } from "../../src/domain/entities/conversion"
import { GetPort } from "../../src/domain/ports/primary/getPort"; 


// Dependencias

export interface ConversionRepository {
    buscarPorId(id:string): Promise<Conversion | null>;
}


// Caso de uso

export class GetConversionById implements GetPort{

    constructor (
        private conversionRepository: ConversionRepository
    ) {};


    async getById(id:string): Promise<Conversion | null> {
        const target: Conversion | null = await this.conversionRepository.buscarPorId(id);
        return target;
    }
}