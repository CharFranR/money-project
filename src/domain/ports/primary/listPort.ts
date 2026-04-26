import { Conversion } from "../../entities/conversion";


export interface ListPort {

    list(): Promise<Conversion[]>;

}