export interface ConvertToHashService {
    convert(password: string): Promise<string>;
}
