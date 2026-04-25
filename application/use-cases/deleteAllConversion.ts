import { Conversion } from "../../src/domain/entities/conversion"


// Dependencias

export interface ConversionRepository {
    eliminarTodas():Promise<void>
}


// Caso de uso

export class DeleteAllConversion {

    constructor(
        private conversionRepository: ConversionRepository
    ){}

    async ejecutar (): Promise<void> {
        await this.conversionRepository.eliminarTodas()
    }
}