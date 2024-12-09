import { hash } from "bcrypt";
import { ConvertToHashService } from "../../application/contracts";

export class ConvertToHashBcryptService implements ConvertToHashService {
    public async convert(value: string): Promise<string> {
        const hashedValue = await hash(value, 8);
        return hashedValue;
    }
}
