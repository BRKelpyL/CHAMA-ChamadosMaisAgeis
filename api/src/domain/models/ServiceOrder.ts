export type ServiceOrderProps = {
    id: number;
    title: string;
    description: string;
    toSector: string;
    status: string;
    createdAt: Date;
    attibutedAt?: Date;
    closedAt?: Date;
};

export class ServiceOrder {
    private readonly id: number;
    private readonly title: string;
    private readonly description: string;
    private readonly toSector: string;
    private readonly status: string;
    private readonly createdAt: Date;
    private readonly attibutedAt?: Date;
    private readonly closedAt?: Date;

    constructor(props: ServiceOrderProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.toSector = props.toSector;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.attibutedAt = props.attibutedAt;
        this.closedAt = props.closedAt;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getToSector(): string {
        return this.toSector;
    }

    public getStatus(): string {
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
