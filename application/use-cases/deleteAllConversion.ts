import { Conversion } from "../../src/domain/entities/conversion"
import { DeleteAllPort } from "../../src/domain/ports/primary/deleteAllPort"


// Dependencias

export interface ConversionRepository {
    eliminarTodas():Promise<void>
}


// Caso de uso

export class DeleteAllConversion implements DeleteAllPort {

    constructor(
        private conversionRepository: ConversionRepository
    ){}

    async deleteAll (): Promise<void> {
        await this.conversionRepository.eliminarTodas()
    }
}