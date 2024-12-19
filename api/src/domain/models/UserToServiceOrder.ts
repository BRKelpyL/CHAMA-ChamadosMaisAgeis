export type UserToServiceOrderProps = {
    id: string;
    userId: string;
    serviceOrderId: string;
    relation: string;
};

export class UserToServiceOrder {
    private readonly id: string;
    private readonly userId: string;
    private readonly serviceOrderId: string;
    private readonly relation: string;

    constructor(props: UserToServiceOrderProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.serviceOrderId = props.serviceOrderId;
        this.relation = props.relation;
    }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getServiceOrder(): string {
        return this.serviceOrderId;
    }

    public getRelation(): string {
        return this.relation;
    }
}
