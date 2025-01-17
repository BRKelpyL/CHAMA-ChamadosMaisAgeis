export type UserToSectorProps = {
    id: string;
    userId: string;
    sectorId: string;
    deleted: boolean;
};

export class UserToSector {
    private readonly id: string;
    private readonly userId: string;
    private readonly sectorId: string;
    private readonly deleted: boolean;

    constructor(props: UserToSectorProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.sectorId = props.sectorId;
        this.deleted = props.deleted;
    }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getSectorId(): string {
        return this.sectorId;
    }

    public getDeleted(): boolean {
        return this.deleted;
    }
}
