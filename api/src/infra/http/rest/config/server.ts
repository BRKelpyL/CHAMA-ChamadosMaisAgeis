import { PrismaClient } from "@prisma/client";
import { ServerHttpRest } from "../contracts";
import {
    CreateUserRoute,
    DeleteUserByIdRoute,
    LoadUserByIdRoute,
    LoadUsersRoute,
    UpdateUserRoute,
} from "../routes/User";
import { CreateSectorRoute } from "../routes/Sector";
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
    new UpdateUserRoute(serverHttpRest, prismaClient);
    new DeleteUserByIdRoute(serverHttpRest, prismaClient);

    new CreateSectorRoute(serverHttpRest, prismaClient);

    new CreateServiceOrderRoute(serverHttpRest, prismaClient);

    serverHttpRest.listen(port);

    console.log(`Server running on port ${port}`);
}
