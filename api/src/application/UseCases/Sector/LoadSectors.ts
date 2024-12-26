import { Sector } from "../../../domain/models";
import { LoadSectorsRepository } from "../../../domain/repositories";
import {
    LoadSectors,
    LoadSectorsInputDto,
    LoadSectorsOutputDto,
} from "../../contracts";

export class LoadSectorsUseCase implements LoadSectors {
    constructor(
        private readonly loadSectorsRepository: LoadSectorsRepository
    ) {}

    public async execute(
        input: LoadSectorsInputDto
    ): Promise<LoadSectorsOutputDto> {
        const sectors = await this.loadSectorsRepository.load();

        return {
            sectors: sectors.map((sector) => {
                return {
                    id: sector.getId(),
                    name: sector.getName(),
                    deleted: sector.getDeleted(),
                };
            }),
        };
    }
}
