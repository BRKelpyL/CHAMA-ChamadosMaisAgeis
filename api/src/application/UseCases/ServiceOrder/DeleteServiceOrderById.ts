import { ServiceOrder, ServiceOrderStatus } from "../../../domain/models";
import { DeleteServiceOrderByIdRepository } from "../../../domain/repositories";
import {
    DeleteServiceOrderById,
    DeleteServiceOrderByIdInputDto,
    DeleteServiceOrderByIdOutputDto,
} from "../../contracts";

export class DeleteServiceOrderByIdUseCase implements DeleteServiceOrderById {
    constructor(
        private readonly deleteServiceOrderByIdRepository: DeleteServiceOrderByIdRepository
    ) {}

    public async execute(
        input: DeleteServiceOrderByIdInputDto
    ): Promise<DeleteServiceOrderByIdOutputDto> {
        const { id } = input;

        const serviceOrder = await this.deleteServiceOrderByIdRepository.delete(
            id
        );

        if (!serviceOrder) {
            throw new Error("ServiceOrder not deleted");
        }

        return {
            id: serviceOrder.getId(),
            title: serviceOrder.getTitle(),
            description: serviceOrder.getDescription(),
            toSectorId: serviceOrder.getToSectorId(),
            status: serviceOrder.getStatus(),
            createdAt: serviceOrder.getCreatedAt(),
            attributedAt: serviceOrder.getAttributedAt() ?? undefined,
            closedAt: serviceOrder.getClosedAt() ?? undefined,
            deleted: serviceOrder.getDeleted(),
        };
    }
}
