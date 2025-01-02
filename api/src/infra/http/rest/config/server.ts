import { PrismaClient } from "@prisma/client";
import { ServerHttpRest } from "../contracts";
import {
    CreateUserRoute,
    DeleteUserByIdRoute,
    LoadDeletedUsersRoute,
    LoadUserByIdRoute,
    LoadUsersRoute,
    UpdateUserRoute,
} from "../routes/User";
import {
    CreateSectorRoute,
    LoadSectorsRoute,
    LoadSectorByIdRoute,
    DeleteSectorRoute,
} from "../routes/Sector";
import { CreateServiceOrderRoute } from "../routes/ServiceOrder";

export type StartServerProps = {
    serverHttpRest: ServerHttpRest;
    port: number;
};

export async function startServer(props: StartServerProps): Promise<void> {
    const prismaClient = new PrismaClient();
    const { serverHttpRest, port } = props;

    new CreateUserRoute(serverHttpRest, prismaClient);
    new LoadUsersRoute(serverHttpRest, prismaClient);
    new LoadUserByIdRoute(serverHttpRest, prismaClient);
    new LoadDeletedUsersRoute(serverHttpRest, prismaClient);
    new UpdateUserRoute(serverHttpRest, prismaClient);
    new DeleteUserByIdRoute(serverHttpRest, prismaClient);

    new CreateSectorRoute(serverHttpRest, prismaClient);
    new LoadSectorsRoute(serverHttpRest, prismaClient);
    new LoadSectorByIdRoute(serverHttpRest, prismaClient);
    new DeleteSectorRoute(serverHttpRest, prismaClient);

    new CreateServiceOrderRoute(serverHttpRest, prismaClient);

    serverHttpRest.listen(port);

    console.log(`Server running on port ${port}`);
}
