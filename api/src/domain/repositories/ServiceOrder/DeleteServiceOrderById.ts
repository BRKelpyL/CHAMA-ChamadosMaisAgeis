import { ServiceOrder } from "../../models";

export interface DeleteServiceOrderByIdRepository {
    delete: (id: string) => Promise<ServiceOrder | undefined>;
}
