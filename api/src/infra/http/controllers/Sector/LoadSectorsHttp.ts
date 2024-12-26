import { LoadSectors } from "../../../../application/contracts";
import {
    LoadSectorsHttp,
    LoadSectorsHttpInputDto,
    LoadSectorsHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, sucess, unknownError } from "../../helpers";

export class LoadSectorsHttpController implements LoadSectorsHttp {
    constructor(private readonly loadSectors: LoadSectors) {}

    public async handle(
        request: LoadSectorsHttpInputDto
    ): Promise<HttpResponse<LoadSectorsHttpOutputDto | Error>> {
        try {
            const sectors = await this.loadSectors.execute(request);
            if (sectors instanceof Error) {
                return badRequest(sectors);
            }

            return sucess<LoadSectorsHttpOutputDto>(sectors);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
