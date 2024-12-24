import { Sector } from "../../models";

export interface LoadSectorByIdRepository {
    load: (id: string) => Promise<Sector | undefined>;
}
