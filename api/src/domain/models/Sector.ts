export type SectorProps = {
    id: string;
    name: string;
    deleted: boolean;
};

export class Sector {
    private readonly id: string;
    private readonly name: string;
    private readonly deleted: boolean;

    constructor(props: SectorProps) {
        this.id = props.id;
        this.name = props.name;
        this.deleted = props.deleted;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDeleted(): boolean {
        return this.deleted;
    }
}
