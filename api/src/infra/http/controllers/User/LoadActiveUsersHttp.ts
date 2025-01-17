import { LoadActiveUsers } from "../../../../application/contracts";
import {
    LoadActiveUserHttpOutputDto,
    LoadActiveUsersHttp,
    LoadActiveUsersHttpInputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadActiveUsersHttpController implements LoadActiveUsersHttp {
    constructor(private readonly loadUsers: LoadActiveUsers) {}

    public async handle(
        request: LoadActiveUsersHttpInputDto
    ): Promise<HttpResponse<LoadActiveUserHttpOutputDto | Error>> {
        try {
            const users = await this.loadUsers.execute(request);
            if (users instanceof Error) {
                return badRequest(users);
            }

            return success<LoadActiveUserHttpOutputDto>(users);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
