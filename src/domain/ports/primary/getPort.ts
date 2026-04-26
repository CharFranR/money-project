import { Conversion } from "../../entities/conversion";


export interface GetPort {

    getById(id: string): Promise<Conversion | null>;

}