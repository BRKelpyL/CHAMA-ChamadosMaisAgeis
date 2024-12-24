import { Sector } from "../../models";

export interface DeleteSectorRepository {
    delete: (id: string) => Promise<Sector | undefined>;
}
