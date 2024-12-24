import {
    DeleteSectorRepository,
    LoadSectorByIdRepository,
} from "../../../domain/repositories";
import {
    DeleteSector,
    DeleteSectorInputDto,
    DeleteSectorOutputDto,
} from "../../contracts";

export class DeleteSectorUseCase implements DeleteSector {
    constructor(
        private readonly deleteSectorRepository: DeleteSectorRepository,
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository
    ) {}

    public async execute(
        input: DeleteSectorInputDto
    ): Promise<DeleteSectorOutputDto | Error> {
        const { id } = input;

        const existingSector = await this.loadSectorByIdRepository.load(id);
        if (!existingSector) {
            return new Error(`Sector ${id} not found`);
        }

        const deletedSector = await this.deleteSectorRepository.delete(id);

        if (!deletedSector) {
            return new Error("Sector not deleted");
        }

        return {
            id: deletedSector.getId(),
            name: deletedSector.getName(),
        };
    }
}
