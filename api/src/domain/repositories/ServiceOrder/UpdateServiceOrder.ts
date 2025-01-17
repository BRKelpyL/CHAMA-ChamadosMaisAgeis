import { ServiceOrder } from "../../models";

export interface UpdateServiceOrderRepository {
    update: (serviceOrder: ServiceOrder) => Promise<ServiceOrder | undefined>;
}
