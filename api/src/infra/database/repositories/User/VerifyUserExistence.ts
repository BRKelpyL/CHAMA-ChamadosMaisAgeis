import { PrismaClient } from "@prisma/client";
import { VerifyUserExistenceRepository } from "../../../../domain/repositories";

export class VerifyUserExistencePrismaRepository implements VerifyUserExistenceRepository {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(
        prismaClient: PrismaClient
    ): VerifyUserExistenceRepository {
        return new VerifyUserExistencePrismaRepository(prismaClient)
    }

    public async verify(): Promise<boolean> {
        const firstUser = await this.prismaClient.user.findFirst({
            where: {
                deleted: false
            }
        })
        if(!firstUser){
            return false
        }
        return true
    }
}