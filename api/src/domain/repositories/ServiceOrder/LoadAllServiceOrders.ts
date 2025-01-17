import { ServiceOrder } from "../../models";

export interface LoadAllServiceOrdersRepository {
    load: () => Promise<ServiceOrder[]>;
}
