import { LoadDeletedUsers } from "../../../../application/contracts";
import {
    LoadDeletedUsersHttp,
    LoadDeletedUsersHttpInputDto,
    LoadDeletedUsersHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, sucess, unknownError } from "../../helpers";

export class LoadDeletedUsersHttpController implements LoadDeletedUsersHttp {
    constructor(private readonly loadDeletedUsers: LoadDeletedUsers) {}

    public async handle(
        request: LoadDeletedUsersHttpInputDto
    ): Promise<HttpResponse<LoadDeletedUsersHttpOutputDto | Error>> {
        try {
            const deletedUsers = await this.loadDeletedUsers.execute(request);
            if (deletedUsers instanceof Error) {
                return badRequest(deletedUsers);
            }

            return sucess<LoadDeletedUsersHttpOutputDto>(deletedUsers);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
