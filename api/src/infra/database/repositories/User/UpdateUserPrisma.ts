import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { UpdateUserRepository } from "../../../../domain/repositories";

export class UpdateUserPrismaRepository implements UpdateUserRepository {
    constructor(private readonly prismaClient: PrismaClient) {}
    public static create(prismaClient: PrismaClient): UpdateUserRepository {
        return new UpdateUserPrismaRepository(prismaClient);
    }

    public async update(user: User): Promise<User | undefined> {
        const updatedUser = await this.prismaClient.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                isAdmin: user.getIsAdmin(),
                whatsapp: user.getWhatsapp(),
            },
        });

        if (!updatedUser) {
            return undefined;
        }

        return new User({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
            whatsapp: updatedUser.whatsapp ?? undefined,
        });
    }
}
