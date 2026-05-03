import { RegisterConversion } from "../../../application/use-cases/registerConversion"
import { ListConversion } from "../../../application/use-cases/listConversion"
import { GetConversionById } from "../../../application/use-cases/getConversionById"
import { DeleteConversion } from "../../../application/use-cases/deleteConversion"
import { DeleteAllConversion } from "../../../application/use-cases/deleteAllConversion"

import { PrismaConversionRepository } from "../secondary/prismaConversionRepository"
import { PrismaMonedaRepository } from "../secondary/prismaMonedaRepository"
import { ExchangeRate } from "../secondary/exchangeRate"

export const handleFunctions = {
    handleRegisterConversion,
    handleList,
    handleGet,
    handleDelete,
    handleDeleteAll,
}

export async function handleRegisterConversion(allCommand:string[]) {

    const codeMonedaOrigen = allCommand[3];
    const codeMonedaDestino = allCommand[4];
    const montoOriginal = parseFloat(allCommand[5]);

    const exchangeRateService = new ExchangeRate()
    const conversionRepository = new PrismaConversionRepository()
    const monedaRepository = new PrismaMonedaRepository()
    

    const useCase = new RegisterConversion (exchangeRateService, conversionRepository, monedaRepository)

    // return useCase.register(codeMonedaOrigen, codeMonedaDestino, montoOriginal)

    const conversion = await useCase.register(codeMonedaOrigen, codeMonedaDestino, montoOriginal)

    console.log(conversion)

}

export async function handleList(){
    console.log("Funcion list")
}

export async function handleGet(instanceID:string) {
    console.log("Funcion get")
}

export async function handleDelete(instanceID:string) {
    console.log("Funcion delete")
}

export function handleDeleteAll() {
    console.log("Funcion dropear")
}