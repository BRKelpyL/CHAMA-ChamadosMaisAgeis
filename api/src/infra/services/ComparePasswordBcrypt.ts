import { compare } from "bcrypt";
import { ComparePasswordService } from "../../application/contracts";

export class ComparePasswordBcryptService implements ComparePasswordService {
    public async compare(
        password: string,
        cryptedPassword: string
    ): Promise<Boolean> {
        const isPasswordCorrect = await compare(password, cryptedPassword);
        return isPasswordCorrect;
    }
}
