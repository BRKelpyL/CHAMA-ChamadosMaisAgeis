import { LoadServiceOrdersBySectorRepository } from "@/src/domain/repositories";
import {
    LoadServiceOrdersBySector,
    LoadServiceOrdersBySectorInputDto,
    LoadServiceOrdersBySectorOutputDto,
} from "../../contracts";

export class LoadServiceOrdersBySectorUseCase
    implements LoadServiceOrdersBySector
{
    constructor(
        private readonly loadServiceOrdersBySectorRepository: LoadServiceOrdersBySectorRepository
    ) {}

    public async execute(
        input: LoadServiceOrdersBySectorInputDto
    ): Promise<LoadServiceOrdersBySectorOutputDto | Error> {
        const { sectorId } = input;
        const serviceOrders =
            await this.loadServiceOrdersBySectorRepository.load(sectorId);
        if (!serviceOrders) {
            return new Error("Service orders not found");
        }

        return {
            serviceOrders: serviceOrders.map((serviceOrder: any) => ({
                id: serviceOrder.id,
                title: serviceOrder.title,
                description: serviceOrder.description,
                toSectorId: serviceOrder.toSectorId,
                status: serviceOrder.status,
                createdAt: serviceOrder.createdAt,
                attributedAt: serviceOrder.attributedAt,
                closedAt: serviceOrder.closedAt,
            })),
        };
    }
}
