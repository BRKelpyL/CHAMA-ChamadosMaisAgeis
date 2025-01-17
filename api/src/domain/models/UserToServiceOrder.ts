export type UserToServiceOrderRelation =
    | "whoIsAskingFor"
    | "whoIsHandling"
    | "whoIsInterested";

export type UserToServiceOrderProps = {
    id: string;
    userId: string;
    serviceOrderId: string;
    relation: UserToServiceOrderRelation;
    deleted: boolean;
};

export class UserToServiceOrder {
    private readonly id: string;
    private readonly userId: string;
    private readonly serviceOrderId: string;
    private readonly relation: UserToServiceOrderRelation;
    private readonly deleted: boolean;

    constructor(props: UserToServiceOrderProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.serviceOrderId = props.serviceOrderId;
        this.relation = props.relation;
        this.deleted = props.deleted;
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

    public getRelation(): UserToServiceOrderRelation {
        return this.relation;
    }

    public getDeleted(): boolean {
        return this.deleted;
    }
}
