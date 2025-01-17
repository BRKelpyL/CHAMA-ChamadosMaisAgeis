import { ServiceOrder, UserToServiceOrderRelation } from "../../models";

export interface LoadAllServiceOrdersByUserRelationRepository {
    load(
        userId: string,
        relation: UserToServiceOrderRelation
    ): Promise<ServiceOrder[]>;
}
