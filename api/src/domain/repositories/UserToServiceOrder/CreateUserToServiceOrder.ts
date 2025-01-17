import { UserToServiceOrder } from "../../models";

export interface CreateUserToServiceOrderRepository {
    save(
        userToServiceOrder: UserToServiceOrder
    ): Promise<UserToServiceOrder | undefined>;
}
