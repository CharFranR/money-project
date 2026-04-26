import { Conversion } from "../../src/domain/entities/conversion"
import { ListPort } from "../../src/domain/ports/primary/listPort";

// Dependencias

export interface ConversionRepository {
    obtenerTodas(): Promise<Conversion[]>;
}

// Caso de uso

export class ListConversion implements ListPort {

    constructor (
        private conversionRepository: ConversionRepository
    ) {}

    async list (): Promise<Conversion[]> {
        const all_conversions:Conversion[] = await this.conversionRepository.obtenerTodas();

        return all_conversions;

    }
}