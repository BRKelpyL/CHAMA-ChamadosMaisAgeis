import { env } from "../env";
import { GenerateIdCryptoUuidService, ConvertToHashBcryptService } from "../../../../services";
import { PrismaClient } from "@prisma/client";

const generateIdService = new GenerateIdCryptoUuidService()
const convertToHash = new ConvertToHashBcryptService()

export const userSeed = async (prismaClient: PrismaClient) => {
    const user = await prismaClient.user.findFirst({
        where: {
            isAdmin: true,
            deleted: false
        }
    })

    if(user) {
        return "Admin user already exists"
    }

    const hashedPassword = await convertToHash.convert(env.root_user.password)
    const createdUser = await prismaClient.user.create({
        data: {
            name: env.root_user.name,
            email: env.root_user.email,
            deleted: false,
            id: generateIdService.generate(),
            isAdmin: true,
            password: hashedPassword
        }
    })
    if(createdUser) {
        return "Admin user created"
    }
    return "Failed to create admin user"
}