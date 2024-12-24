export type ServiceOrderStatus =
    | "Aberto"
    | "Em atendimento"
    | "Solucionado"
    | "Fechado";

export type ServiceOrderProps = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: ServiceOrderStatus;
    createdAt: Date;
    attibutedAt?: Date;
    closedAt?: Date;
};

export class ServiceOrder {
    private readonly id: string;
    private readonly title: string;
    private readonly description: string;
    private readonly toSectorId: string;
    private readonly status: ServiceOrderStatus;
    private readonly createdAt: Date;
    private readonly attibutedAt?: Date;
    private readonly closedAt?: Date;

    constructor(props: ServiceOrderProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.toSectorId = props.toSectorId;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.attibutedAt = props.attibutedAt;
        this.closedAt = props.closedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getToSectorId(): string {
        return this.toSectorId;
    }

    public getStatus(): ServiceOrderStatus {
        return this.status;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getAttributedAt(): Date | undefined {
        return this.attibutedAt;
    }

    public getClosedAt(): Date | undefined {
        return this.closedAt;
    }
}
