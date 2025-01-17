import { ServiceOrder } from "../../models";

export interface LoadServiceOrderByIdRepository {
    load: (id: string) => Promise<ServiceOrder | undefined>;
}
