import { ServiceOrder } from "../../../domain/models";
import { LoadAllServiceOrdersByUserRelationRepository } from "../../../domain/repositories";
import {
    LoadAllServiceOrdersByUserRelation,
    LoadAllServiceOrdersByUserRelationInputDto,
    LoadAllServiceOrdersByUserRelationOutputDto,
} from "../../contracts";

export class LoadAllServiceOrdersByUserRelationUseCase
    implements LoadAllServiceOrdersByUserRelation
{
    constructor(
        private loadServiceOrdersByUserRelationRepository: LoadAllServiceOrdersByUserRelationRepository
    ) {}

    public async execute(
        input: LoadAllServiceOrdersByUserRelationInputDto
    ): Promise<LoadAllServiceOrdersByUserRelationOutputDto> {
        const { authenticatedUserId, relation } = input;

        const serviceOrders =
            await this.loadServiceOrdersByUserRelationRepository.load(
                authenticatedUserId,
                relation
            );

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
