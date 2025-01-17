import {
    ExtractInfoFromTokenService,
    ExtractInfoFromTokenOutputDto,
} from "../../application/contracts";
import { verify, decode } from "jsonwebtoken";
import { env } from "../http/rest/config";

export class ExtractInfoFromTokenJwtService
    implements ExtractInfoFromTokenService
{
    public async extract(
        token: string
    ): Promise<ExtractInfoFromTokenOutputDto | Error> {
        try {
            console.log(token);
            verify(token, env.auth.secret);

            const { userId, role } = decode(token) as {
                userId: string;
                role: string;
            };

            return { userId, role };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }
}
