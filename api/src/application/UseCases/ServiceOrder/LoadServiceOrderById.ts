import { LoadServiceOrderByIdRepository } from "../../../domain/repositories";
import {
    LoadServiceOrderById,
    LoadServiceOrderByIdInputDto,
    LoadServiceOrderByIdOutputDto,
} from "../../contracts";

export class LoadServiceOrderByIdUseCase implements LoadServiceOrderById {
    constructor(
        private readonly loadServiceOrderByIdRepository: LoadServiceOrderByIdRepository
    ) {}

    public async execute(
        input: LoadServiceOrderByIdInputDto
    ): Promise<LoadServiceOrderByIdOutputDto | Error> {
        const { id } = input;

        const loadedServiceOrder =
            await this.loadServiceOrderByIdRepository.load(id);

        if (!loadedServiceOrder) {
            return new Error("ServiceOrder not found");
        }

        return {
            id: loadedServiceOrder.getId(),
            title: loadedServiceOrder.getTitle(),
            description: loadedServiceOrder.getDescription(),
            toSectorId: loadedServiceOrder.getToSectorId(),
            status: loadedServiceOrder.getStatus(),
            createdAt: loadedServiceOrder.getCreatedAt(),
            attributedAt: loadedServiceOrder.getAttributedAt() ?? undefined,
            closedAt: loadedServiceOrder.getClosedAt() ?? undefined,
            deleted: loadedServiceOrder.getDeleted(),
        };
    }
}
