import { Sector } from "../../models";

export interface LoadSectorByNameRepository {
    load: (name: string) => Promise<Sector | undefined>;
}
