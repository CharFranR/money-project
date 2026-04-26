import { Conversion } from "../../entities/conversion";


export interface DeletePort {

    deleteById(id: string): Promise<void>;

}