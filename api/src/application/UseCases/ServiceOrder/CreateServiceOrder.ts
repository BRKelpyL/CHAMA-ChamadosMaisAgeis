import {
    ServiceOrder,
    ServiceOrderStatus,
    UserToServiceOrder,
} from "../../../domain/models";
import {
    CreateServiceOrderRepository,
    CreateUserToServiceOrderRepository,
    LoadSectorByIdRepository,
} from "../../../domain/repositories";
import {
    CreateServiceOrder,
    CreateServiceOrderInputDto,
    CreateServiceOrderOutputDto,
    GenerateIdService,
} from "../../contracts";

export class CreateServiceOrderUseCase implements CreateServiceOrder {
    constructor(
        private readonly createServiceOrderRepository: CreateServiceOrderRepository,
        private readonly createUserToServiceOrderRepository: CreateUserToServiceOrderRepository,
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository,
        private readonly generateIdService: GenerateIdService
    ) {}

    public async execute(
        input: CreateServiceOrderInputDto
    ): Promise<CreateServiceOrderOutputDto | Error> {
        const { authenticatedUserId, title, description, toSectorId } = input;

        const verifyToSectorId = await this.loadSectorByIdRepository.load(
            toSectorId
        );

        if (!verifyToSectorId) {
            return new Error(`Sector ${toSectorId} not found`);
        }

        const id = this.generateIdService.generate();
        const status: ServiceOrderStatus = "Aberto";
        const createdAt = new Date();
        const deleted = false;

        const serviceOrder = new ServiceOrder({
            id,
            title,
            description,
            toSectorId,
            status,
            createdAt,
            deleted,
        });

        const createdServiceOrder =
            await this.createServiceOrderRepository.save(serviceOrder);

        if (!createdServiceOrder) {
            return new Error(`Can not create ServiceOrder`);
        }

        const userToServiceOrder = new UserToServiceOrder({
            id: this.generateIdService.generate(),
            userId: authenticatedUserId,
            serviceOrderId: createdServiceOrder.getId(),
            relation: "whoIsAskingFor",
            deleted,
        });

        await this.createUserToServiceOrderRepository.save(userToServiceOrder);

        return {
            id: createdServiceOrder.getId(),
            title: createdServiceOrder.getTitle(),
            description: createdServiceOrder.getDescription(),
            toSectorId: createdServiceOrder.getToSectorId(),
            status: createdServiceOrder.getStatus(),
            createdAt: createdServiceOrder.getCreatedAt(),
            attributedAt: createdServiceOrder.getAttributedAt(),
            closedAt: createdServiceOrder.getClosedAt(),
        };
    }
}
