import { Conversion } from "../../src/domain/entities/conversion"
import { DeletePort } from "../../src/domain/ports/primary/deletePort"


// Dependencias

export interface ConversionRepository {
    eliminar(id:string):Promise<void>
}


// Caso de uso

export class DeleteConversion implements DeletePort{

    constructor(
        private conversionRepository: ConversionRepository
    ){}

    async deleteById (id:string): Promise<void> {
        await this.conversionRepository.eliminar(id)
    }
}