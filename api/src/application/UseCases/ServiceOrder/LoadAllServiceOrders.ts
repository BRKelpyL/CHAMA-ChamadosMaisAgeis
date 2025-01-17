import { ServiceOrder } from "../../../domain/models";
import { LoadAllServiceOrdersRepository } from "../../../domain/repositories";
import {
    LoadAllServiceOrders,
    LoadAllServiceOrdersInputDto,
    LoadAllServiceOrdersOutputDto,
} from "../../contracts";

export class LoadAllServiceOrdersUseCase implements LoadAllServiceOrders {
    constructor(
        private readonly loadAllServiceOrdersRepository: LoadAllServiceOrdersRepository
    ) {}

    public async execute(
        input: LoadAllServiceOrdersInputDto
    ): Promise<LoadAllServiceOrdersOutputDto> {
        const serviceOrders = await this.loadAllServiceOrdersRepository.load();

        return {
            serviceOrders: serviceOrders.map((serviceOrder: ServiceOrder) => ({
                id: serviceOrder.getId(),
                title: serviceOrder.getTitle(),
                description: serviceOrder.getDescription(),
                toSectorId: serviceOrder.getToSectorId(),
                status: serviceOrder.getStatus(),
                createdAt: serviceOrder.getCreatedAt(),
                attributedAt: serviceOrder.getAttributedAt(),
                closedAt: serviceOrder.getClosedAt(),
            })),
        };
    }
}
