import { HttpController } from "../Controller";

export type LoadSectorsHttpInputDto = void;

export type LoadSectorsHttpOutputDto = {
    sectors: {
        id: string;
        name: string;
        deleted: boolean;
    }[];
};

export type LoadSectorsHttp = HttpController<
    LoadSectorsHttpInputDto,
    LoadSectorsHttpOutputDto | Error
>;
