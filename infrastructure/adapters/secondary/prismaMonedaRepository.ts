import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { Moneda } from "../../../src/domain/entities/moneda";
import { MonedaRepository } from "../../../src/domain/ports/secondary/monedaRepository";

export class PrismaMonedaRepository implements MonedaRepository {

    private prisma: PrismaClient;

    constructor(){
        const adapter = new PrismaBetterSqlite3({
            url: "file:./dev.db",
        });
    
        this.prisma = new PrismaClient({adapter});
    }

    async buscarPorCodigo(code:string): Promise<Moneda | null>{
        const monedaObjetivo = await this.prisma.moneda.findUnique({
            where: {
                codigo: code
            }
        });

        if (!monedaObjetivo) {
            return null
        }
        
        return this.toDomain(monedaObjetivo)
    }

    private toDomain(prismaData: any): Moneda {
        return new Moneda(
            prismaData.id,
            prismaData.nombre,
            prismaData.codigo
        );
    }

}