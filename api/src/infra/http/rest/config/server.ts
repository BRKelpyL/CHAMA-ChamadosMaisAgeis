import { PrismaClient } from "@prisma/client";
import { ServerHttpRest } from "../contracts";
import { CreateUserRoute, LoadUsersRoute } from "../routes";

export type StartServerProps = {
    serverHttpRest: ServerHttpRest;
    port: number;
};

export async function startServer(props: StartServerProps): Promise<void> {
    const prismaClient = new PrismaClient();
    const { serverHttpRest, port } = props;

    new CreateUserRoute(serverHttpRest, prismaClient);

    serverHttpRest.listen(port);

    console.log(`Server running on port ${port}`);
}
