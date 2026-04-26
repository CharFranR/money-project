import { Conversion } from "../../entities/conversion";


export interface DeleteAllPort {

    deleteAll(): Promise<void>;
    
}