import { Sector, User, UserToSector } from "../../../domain/models";
import {
    CreateUserToSectorRepository,
    LoadSectorByIdRepository,
    LoadUserByIdRepository,
} from "../../../domain/repositories";
import {
    AddUserToSector,
    AddUserToSectorInputDto,
    AddUserToSectorOutputDto,
    GenerateIdService,
} from "../../contracts";

export class AddUserToSectorUseCase implements AddUserToSector {
    constructor(
        private readonly createUserToSectorRepository: CreateUserToSectorRepository,
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository,
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly generateIdService: GenerateIdService
    ) {}

    public async execute(
        input: AddUserToSectorInputDto
    ): Promise<AddUserToSectorOutputDto | Error> {
        const { sectorId, userId } = input;

        const sector = await this.loadSectorByIdRepository.load(sectorId);
        if (!sector) {
            return new Error(`Sector ${sectorId} not found`);
        }

        const user = await this.loadUserByIdRepository.load(userId);
        if (!user) {
            return new Error(`User ${userId} not found`);
        }

        const id = this.generateIdService.generate();
        const deleted = false;

        const userToSector = new UserToSector({
            id,
            userId,
            sectorId,
            deleted,
        });

        const createdUserToSector =
            await this.createUserToSectorRepository.save(userToSector);

        if (!createdUserToSector) {
            return new Error("Error creating user to sector");
        }

        return {
            id: createdUserToSector.getId(),
            userId: createdUserToSector.getUserId(),
            sectorId: createdUserToSector.getSectorId(),
            deleted: createdUserToSector.getDeleted(),
        };
    }
}
