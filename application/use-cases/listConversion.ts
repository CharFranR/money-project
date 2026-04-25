import { Conversion } from "../../src/domain/entities/conversion"

// Dependencias

export interface ConversionRepository {
    obtenerTodas(): Promise<Conversion[]>;
}

// Caso de uso

export class ListConversion {

    constructor (
        private conversionRepository: ConversionRepository
    ) {}

    async ejecutar (): Promise<Conversion[]> {
        const all_conversions:Conversion[] = await this.conversionRepository.obtenerTodas();

        return all_conversions;

    }
}