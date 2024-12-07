import { randomUUID } from "crypto";
import { GenerateIdService } from "../../application/contracts";

export class GenerateIdCryptoUuidService implements GenerateIdService {
    public generate(): string {
        return randomUUID();
    }
}
