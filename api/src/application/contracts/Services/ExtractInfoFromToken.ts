export type ExtractInfoFromTokenOutputDto = {
    userId: string;
    role: string;
};

export interface ExtractInfoFromTokenService {
    extract(token: string): Promise<ExtractInfoFromTokenOutputDto | Error>;
}
