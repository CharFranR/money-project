import { Conversion } from "../../src/domain/entities/conversion"


// Dependencias

export interface ConversionRepository {
    eliminar(id:string):Promise<void>
}


// Caso de uso

export class DeleteConversion {

    constructor(
        private conversionRepository: ConversionRepository
    ){}

    async ejecutar (id:string): Promise<void> {
        await this.conversionRepository.eliminar(id)
    }
}