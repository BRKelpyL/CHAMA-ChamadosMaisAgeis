import { LoadSectorByIdRepository } from "../../../domain/repositories";
import {
    LoadSectorByIdInputDto,
    LoadSectorByIdOutputDto,
    LoadSectorById,
} from "../../contracts";

export class LoadSectorByIdUseCase implements LoadSectorById {
    constructor(
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository
    ) {}
    async execute(
        input: LoadSectorByIdInputDto
    ): Promise<LoadSectorByIdOutputDto | Error> {
        const { id } = input;
        const sector = await this.loadSectorByIdRepository.load(id);

        if (!sector) {
            return new Error(`Sector ${id} not found`);
        }

        return {
            id: sector.getId(),
            name: sector.getName(),
            deleted: sector.getDeleted(),
        };
    }
}
