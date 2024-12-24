import { Sector } from "../../../domain/models";
import {
    CreateSectorRepository,
    LoadSectorByNameRepository,
} from "../../../domain/repositories";
import {
    CreateSector,
    CreateSectorInputDto,
    CreateSectorOutputDto,
    GenerateIdService,
} from "../../contracts";

export class CreateSectorUseCase implements CreateSector {
    constructor(
        private readonly createSectorRepository: CreateSectorRepository,
        private readonly loadSectorByNameRepository: LoadSectorByNameRepository,
        private readonly generateIdService: GenerateIdService
    ) {}

    public async execute(
        input: CreateSectorInputDto
    ): Promise<CreateSectorOutputDto | Error> {
        const { name } = input;

        const sectorWithSameName = await this.loadSectorByNameRepository.load(
            name
        );
        if (sectorWithSameName) {
            return new Error(`Sector ${name} is already in use`);
        }

        const id = this.generateIdService.generate();

        const sector = new Sector({
            id,
            name,
        });

        const createdSector = await this.createSectorRepository.save(sector);

        if (!createdSector) {
            return new Error("Error creating sector");
        }

        return {
            id: createdSector.getId(),
            name: createdSector.getName(),
        };
    }
}
