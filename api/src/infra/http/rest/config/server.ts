import { PrismaClient } from "@prisma/client";
import { ServerHttpRest } from "../contracts";
import {
    CreateUserRoute,
    DeleteUserByIdRoute,
    LoadDeletedUsersRoute,
    LoadUserByIdRoute,
    LoadActiveUsersRoute,
    UpdateUserRoute,
    LoadAllUsersRoute,
    LoginRoute,
} from "../routes/User";
import {
    CreateSectorRoute,
    LoadSectorsRoute,
    LoadSectorByIdRoute,
    DeleteSectorRoute,
} from "../routes/Sector";
import {
    CreateServiceOrderRoute,
    LoadAllServiceOrdersRoute,
    LoadAllServiceOrdersByUserRelationRoute,
    LoadServiceOrderByIdRoute,
    LoadServiceOrdersBySectorRoute,
} from "../routes/ServiceOrder";
import { AddUserToSectorRoute } from "../routes/Sector/AddUserToSector";

export type StartServerProps = {
    serverHttpRest: ServerHttpRest;
    port: number;
};

export async function startServer(props: StartServerProps): Promise<void> {
    const prismaClient = new PrismaClient();
    const { serverHttpRest, port } = props;

    new CreateUserRoute(serverHttpRest, prismaClient);
    new LoadAllUsersRoute(serverHttpRest, prismaClient);
    new LoadActiveUsersRoute(serverHttpRest, prismaClient);
    new LoadUserByIdRoute(serverHttpRest, prismaClient);
    new LoadDeletedUsersRoute(serverHttpRest, prismaClient);
    new UpdateUserRoute(serverHttpRest, prismaClient);
    new DeleteUserByIdRoute(serverHttpRest, prismaClient);
    new LoginRoute(serverHttpRest, prismaClient);

    new CreateSectorRoute(serverHttpRest, prismaClient);
    new LoadSectorsRoute(serverHttpRest, prismaClient);
    new LoadSectorByIdRoute(serverHttpRest, prismaClient);
    new DeleteSectorRoute(serverHttpRest, prismaClient);
    new AddUserToSectorRoute(serverHttpRest, prismaClient);

    new CreateServiceOrderRoute(serverHttpRest, prismaClient);
    new LoadAllServiceOrdersRoute(serverHttpRest, prismaClient);
    new LoadServiceOrderByIdRoute(serverHttpRest, prismaClient);
    new LoadAllServiceOrdersByUserRelationRoute(serverHttpRest, prismaClient);
    new LoadServiceOrdersBySectorRoute(serverHttpRest, prismaClient);

    serverHttpRest.listen(port);

    console.log(`Server running on port ${port}`);
}
