import { LoadAllUsers } from "../../../../application/contracts";
import {
    LoadAllUsersHttp,
    LoadAllUsersHttpInputDto,
    LoadAllUsersHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadAllUsersHttpController implements LoadAllUsersHttp {
    constructor(private loadAllUsers: LoadAllUsers) {}

    public async handle(
        request: LoadAllUsersHttpInputDto
    ): Promise<HttpResponse<LoadAllUsersHttpOutputDto | Error>> {
        try {
            const users = await this.loadAllUsers.execute(request);

            if (users instanceof Error) {
                return badRequest(users);
            }

            return success<LoadAllUsersHttpOutputDto>(users);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
