export interface GenerateTokenService {
    generate(userId: string, role: string): Promise<string>;
}
