export type SectorProps = {
    id: string;
    name: string;
};

export class Sector {
    private readonly id: string;
    private readonly name: string;

    constructor(props: SectorProps) {
        this.id = props.id;
        this.name = props.name;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}
