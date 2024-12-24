import { Sector } from "../../models";

export interface CreateSectorRepository {
    save: (sector: Sector) => Promise<Sector | undefined>;
}
