import { LoadUsers } from "../../../application/contracts";
import {
    LoadUserHttpOutputDto,
    LoadUsersHttp,
    LoadUsersHttpInputDto,
    HttpResponse,
} from "../../http";
import {} from "../contracts/controllers/LoadUsersHttp";
import { serverError, sucess, unknownError } from "../helpers";

export class LoadUsersHttpController implements LoadUsersHttp {
    constructor(private readonly loadUsers: LoadUsers) {}

    public async handle(
        request: LoadUsersHttpInputDto
    ): Promise<HttpResponse<LoadUserHttpOutputDto | Error>> {
        try {
            const users = await this.loadUsers.execute(request);
            return sucess<LoadUserHttpOutputDto>(users);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
