import { ServiceOrder, ServiceOrderStatus } from "../../../domain/models";
import {
    CreateServiceOrderRepository,
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
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository,
        private readonly generateIdService: GenerateIdService
    ) {}

    public async execute(
        input: CreateServiceOrderInputDto
    ): Promise<CreateServiceOrderOutputDto | Error> {
        const { title, description, toSectorId } = input;

        const verifyToSectorId = await this.loadSectorByIdRepository.load(
            toSectorId
        );

        if (!verifyToSectorId) {
            return new Error(`Sector ${toSectorId} not found`);
        }

        const id = this.generateIdService.generate();
        const status: ServiceOrderStatus = "Aberto";
        const createdAt = new Date();

        const serviceOrder = new ServiceOrder({
            id,
            title,
            description,
            toSectorId,
            status,
            createdAt,
        });

        const createdServiceOrder =
            await this.createServiceOrderRepository.save(serviceOrder);

        if (!createdServiceOrder) {
            return new Error(`Can not create ServiceOrder`);
        }

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
