import { GenerateTokenService } from "../../application/contracts";
import { sign } from "jsonwebtoken";
import { env } from "../http/rest/config";

export class GenerateTokenJwtService implements GenerateTokenService {
    public async generate(userId: string, role: string): Promise<string> {
        const token = await sign(
            {
                userId,
                role,
            },
            env.auth.secret,
            {
                subject: userId,
                expiresIn: "12h",
            }
        );
        return token;
    }
}
