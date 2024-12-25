import { Sector } from "../../models";

export interface UpdateSectorRepository {
    update: (sector: Sector) => Promise<Sector | undefined>;
}
