// Dependencias
import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { Conversion } from "../../../src/domain/entities/conversion";
import { Moneda } from "../../../src/domain/entities/moneda";
import { ConversionRepository } from "../../../src/domain/ports/secondary/conversionRepository";


// Adaptador

export class PrismaConversionRepository implements ConversionRepository {
    private prisma: PrismaClient;

    constructor(){
        const adapter = new PrismaBetterSqlite3({
            url: "file:./dev.db",
        });

        this.prisma = new PrismaClient({adapter});
    }

    async guardar(conversion: Conversion): Promise<void> {

        const monedaOrigen = await this.prisma.moneda.findUnique({
            where:{
                nombre: conversion.monedaOrigen.nombre,
                codigo: conversion.monedaOrigen.codigo
            }
        })

        const monedaDestino = await this.prisma.moneda.findUnique({
            where:{
                nombre: conversion.monedaDestino.nombre,
                codigo: conversion.monedaDestino.codigo
            }
        })

        if (!monedaOrigen || !monedaDestino) {
            throw Error ("no hay eso")
        }

        await this.prisma.conversion.create({
            data: {
                montoOriginal: conversion.montoOriginal,
                montoConvertido: conversion.montoConvertido,
                tasa: conversion.tasa,
                fecha: conversion.fecha,
                monedaOrigenId: monedaOrigen.id,
                monedaDestinoId: monedaDestino.id
            }
        })
    }

    async obtenerTodas(): Promise<Conversion[]> {
        const response = await this.prisma.conversion.findMany({
            include: {
                monedaOrigen: true,
                monedaDestino: true
            }
        });
        return this.toDomainList(response)
    }

    async buscarPorId(id:string): Promise<Conversion | null> {
        const response= await this.prisma.conversion.findUnique({
            where:{
                id:id
            },
            include: {
                monedaOrigen: true,
                monedaDestino: true
            }
        });
        return this.toDomain(response)
    }

    async buscarPorFecha(date:Date):Promise<Conversion[]> {
        const response= await this.prisma.conversion.findMany({
            where:{
                fecha: date
            },
            include:{
                monedaOrigen: true,
                monedaDestino: true
            }
        })
        return this.toDomainList(response)
    }

    async buscarPorMonedaOrigen(codigo:string):Promise<Conversion[]> {
        const response = await this.prisma.conversion.findMany({
            where:{
                monedaOrigen:{
                    codigo:codigo
                }
            },
            include: {
                monedaOrigen: true,
                monedaDestino: true
            }
        })
        return this.toDomainList(response)
    }

    async buscarPorMonedaDestino(codigo:string):Promise<Conversion[]> {
        const response = await this.prisma.conversion.findMany({
            where:{
                monedaDestino:{
                    codigo:codigo
                }
            },
            include: {
                monedaOrigen: true,
                monedaDestino: true
            }
        })
        return this.toDomainList(response)
    }

    async eliminar(id:string):Promise<void> {
        await this.prisma.conversion.delete({
            where: {
                id: id
            }
        })
    }

    async eliminarTodas():Promise<void> {
        await this.prisma.conversion.deleteMany({})
    }

    private toDomain(prismaData: any): Conversion {
        return new Conversion(
            new Moneda(prismaData.monedaOrigen.id, prismaData.monedaOrigen.nombre, prismaData.monedaOrigen.codigo),
            new Moneda(prismaData.monedaDestino.id, prismaData.monedaDestino.nombre, prismaData.monedaDestino.codigo),
            prismaData.montoOriginal,
            prismaData.montoConvertido,
            prismaData.tasa,
            prismaData.fecha
        );
    }

    private toDomainList(prismaList: any[]): Conversion[] {
        return prismaList.map(item => this.toDomain(item));
    }
}