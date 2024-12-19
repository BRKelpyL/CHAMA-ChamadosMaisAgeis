import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { CreateUserRepository } from "../../../../domain/repositories";

export class CreateUserPrismaRepository implements CreateUserRepository {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): CreateUserPrismaRepository {
        return new CreateUserPrismaRepository(prismaClient);
    }

    public async save(user: User): Promise<User | undefined> {
        const createdUser = await this.prismaClient.user.create({
            data: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                isAdmin: user.getIsAdmin(),
                whatsapp: user.getWhatsapp(),
            },
        });

        if (!createdUser) {
            return undefined;
        }

        return new User({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            isAdmin: createdUser.isAdmin ?? false,
            whatsapp: createdUser.whatsapp ?? undefined,
        });
    }
}
