import {Moneda} from "./moneda"


export class Conversion {
    monedaOrigen: Moneda;
    monedaDestino: Moneda;
    montoOriginal: number;
    montoConvertido: number;
    tasa: number;
    fecha: Date;

    constructor (monedaOrigen: Moneda, monedaDestino: Moneda, montoOriginal: number, montoConvertido: number, tasa: number, fecha: Date) {
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.montoOriginal = montoOriginal;
        this.montoConvertido =  montoConvertido;
        this.tasa = tasa;
        this.fecha = fecha;
    }

    esValida(): boolean{
        return this.monedaOrigen instanceof Moneda && this.monedaDestino instanceof Moneda && typeof this.montoOriginal === 'number' && !Number.isNaN(this.montoOriginal) && Number.isFinite(this.montoOriginal) && typeof this.montoConvertido === 'number' && !Number.isNaN(this.montoConvertido) && Number.isFinite(this.montoConvertido) && typeof this.tasa === 'number' && !Number.isNaN(this.tasa) && Number.isFinite(this.tasa) && this.fecha instanceof Date && !isNaN(this.fecha.getTime())
    }

    obtenerTasaInversa(): number{
        return 1/this.tasa
    }

    esMayorA(monto: number): boolean {
        return this.montoOriginal > monto
    }

    esMenorA(monto: number): boolean {
        return this.montoOriginal < monto
    }

    invertir (): Conversion{
        return new Conversion (
            this.monedaDestino,
            this.monedaOrigen,
            this.montoConvertido,
            this.montoOriginal,
            1 / this.tasa,
            this.fecha
        )
    }

    obtenerDiferencia(): number{
        return this.montoConvertido - this.montoOriginal
    }

    esDeEsteMes(): boolean{
        const ahora = new Date()
        return this.fecha.getMonth() === ahora.getMonth() && this.fecha.getFullYear() === ahora.getFullYear();
    }
    
    formatearFecha(): string{
        const dia = this.fecha.getDate().toString().padStart(2, '0');
        const mes = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = this.fecha.getFullYear();
        const hora = this.fecha.getHours().toString().padStart(2, '0');
        const minutos = this.fecha.getMinutes().toString().padStart(2, '0');

        return `${dia}/${mes}/${año} ${hora}:${minutos}`;
    }
    esLaMismaMoneda(): boolean{
        return this.monedaOrigen.esIgual(this.monedaDestino)
    }
}