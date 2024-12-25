import { Sector } from "../../../domain/models";
import {
    UpdateSectorRepository,
    LoadSectorByNameRepository,
} from "../../../domain/repositories";
import {
    UpdateSector,
    UpdateSectorInputDto,
    UpdateSectorOutputDto,
} from "../../contracts";

export class UpdateSectorUseCase implements UpdateSector {
    constructor(
        private updateSectorRepository: UpdateSectorRepository,
        private loadSectorByNameRepository: LoadSectorByNameRepository
    ) {}

    public async execute(
        input: UpdateSectorInputDto
    ): Promise<UpdateSectorOutputDto | Error> {
        const { id, name } = input;

        const inUseSectorName = await this.loadSectorByNameRepository.load(
            name
        );
        if (inUseSectorName) {
            return new Error(`Sector ${name} already exists`);
        }

        const deleted = false;

        const sector = new Sector({
            id,
            name,
            deleted,
        });

        const updatedSector = await this.updateSectorRepository.update(sector);

        if (!updatedSector) {
            return new Error("Error updating sector");
        }

        return {
            id: updatedSector.getId(),
            name: updatedSector.getName(),
            deleted: updatedSector.getDeleted(),
        };
    }
}
