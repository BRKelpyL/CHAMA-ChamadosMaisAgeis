import { LoadUsers } from "../../../../application/contracts";
import {
    LoadUserHttpOutputDto,
    LoadUsersHttp,
    LoadUsersHttpInputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, sucess, unknownError } from "../../helpers";

export class LoadUsersHttpController implements LoadUsersHttp {
    constructor(private readonly loadUsers: LoadUsers) {}

    public async handle(
        request: LoadUsersHttpInputDto
    ): Promise<HttpResponse<LoadUserHttpOutputDto | Error>> {
        try {
            const users = await this.loadUsers.execute(request);
            if (users instanceof Error) {
                return badRequest(users);
            }

            return sucess<LoadUserHttpOutputDto>(users);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
