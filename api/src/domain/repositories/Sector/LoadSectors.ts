import { Sector } from "../../models";

export interface LoadSectorsRepository {
    load: () => Promise<Sector[]>;
}
