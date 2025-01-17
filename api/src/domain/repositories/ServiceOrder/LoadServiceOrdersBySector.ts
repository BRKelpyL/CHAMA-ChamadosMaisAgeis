import { ServiceOrder } from "../../models";

export interface LoadServiceOrdersBySectorRepository {
    load(sectorId: string): Promise<ServiceOrder[] | undefined>;
}
