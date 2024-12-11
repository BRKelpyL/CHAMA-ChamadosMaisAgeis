export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export class User {
    private readonly id: string;
    private readonly name: string;
    private readonly email: string;
    private readonly password: string;
    private readonly isAdmin: boolean;
    private readonly whatsapp?: string;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.isAdmin = props.isAdmin;
        this.whatsapp = props.whatsapp;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getIsAdmin(): boolean {
        return this.isAdmin;
    }

    public getWhatsapp(): string | undefined {
        return this.whatsapp;
    }
}
