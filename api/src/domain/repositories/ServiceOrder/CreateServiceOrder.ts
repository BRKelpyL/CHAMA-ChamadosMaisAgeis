import { ServiceOrder } from "../../models";

export interface CreateServiceOrderRepository {
    save: (serviceOrder: ServiceOrder) => Promise<ServiceOrder | undefined>;
}
