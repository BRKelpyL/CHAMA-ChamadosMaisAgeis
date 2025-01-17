import { ServiceOrder, ServiceOrderStatus } from "../../../domain/models";
import {
    LoadServiceOrderByIdRepository,
    UpdateServiceOrderRepository,
    LoadSectorByIdRepository,
} from "../../../domain/repositories";
import {
    UpdateServiceOrder,
    UpdateServiceOrderInputDto,
    UpdateServiceOrderOutputDto,
} from "../../contracts";

export class UpdateServiceOrderUseCase implements UpdateServiceOrder {
    constructor(
        private readonly loadServiceOrderByIdRepository: LoadServiceOrderByIdRepository,
        private readonly updateServiceOrderRepository: UpdateServiceOrderRepository,
        private readonly loadSectorByIdRepository: LoadSectorByIdRepository
    ) {}

    public async execute(
        input: UpdateServiceOrderInputDto
    ): Promise<UpdateServiceOrderOutputDto | Error> {
        const {
            id,
            title,
            description,
            toSectorId,
            status,
            createdAt,
            attributedAt,
            closedAt,
        } = input;

        const serviceOrder = await this.loadServiceOrderByIdRepository.load(id);

        if (!serviceOrder) {
            return new Error("ServiceOrder not found");
        }

        const manipulatedTitle = title ? title : serviceOrder.getTitle();
        const manipulatedDescription = description
            ? description
            : serviceOrder.getDescription();

        let manipulatedToSectorId;
        if (toSectorId) {
            const sector = await this.loadSectorByIdRepository.load(toSectorId);
            if (!sector) {
                return new Error("Sector not found");
            }
            manipulatedToSectorId = sector.getId();
        } else {
            manipulatedToSectorId = serviceOrder.getToSectorId();
        }

        let manipulatedStatus: ServiceOrderStatus = status
            ? status
            : serviceOrder.getStatus();
        let manipulatedCreatedAt = serviceOrder.getCreatedAt();
        let manipulatedAttributedAt = serviceOrder.getAttributedAt();
        let manipulatedClosedAt = serviceOrder.getClosedAt();

        const manipulatedServiceOrder = new ServiceOrder({
            id: serviceOrder.getId(),
            title: manipulatedTitle,
            description: manipulatedDescription,
            toSectorId: manipulatedToSectorId,
            status: manipulatedStatus,
            createdAt: manipulatedCreatedAt,
            attibutedAt: manipulatedAttributedAt,
            closedAt: manipulatedClosedAt,
            deleted: serviceOrder.getDeleted(),
        });

        const updatedServiceOrder =
            await this.updateServiceOrderRepository.update(
                manipulatedServiceOrder
            );

        if (!updatedServiceOrder) {
            return new Error("ServiceOrder not updated");
        }

        return {
            id: updatedServiceOrder.getId(),
            title: updatedServiceOrder.getTitle(),
            description: updatedServiceOrder.getDescription(),
            toSectorId: updatedServiceOrder.getToSectorId(),
            status: updatedServiceOrder.getStatus(),
            createdAt: updatedServiceOrder.getCreatedAt(),
            attributedAt: updatedServiceOrder.getAttributedAt(),
            closedAt: updatedServiceOrder.getClosedAt(),
        };
    }
}
