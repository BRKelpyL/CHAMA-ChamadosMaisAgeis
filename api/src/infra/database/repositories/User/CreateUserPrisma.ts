import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { CreateUserRepository } from "../../../../domain/repositories/user";

export class CreateUserPrismaRepository implements CreateUserRepository {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): CreateUserPrismaRepository {
        return new CreateUserPrismaRepository(prismaClient);
    }

    public async save(user: User): Promise<User> {
        const { id, name, email, password, isAdmin, whatsapp } =
            await this.prismaClient.user.create({
                data: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    isAdmin: user.getIsAdmin(),
                    whatsapp: user.getWhatsapp(),
                },
            });

        const createdUser = new User({
            id,
            name,
            email,
            password,
            isAdmin: isAdmin ?? false,
            whatsapp: whatsapp ?? undefined,
        });

        return createdUser;
    }
}
