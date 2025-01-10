export interface ComparePasswordService {
    compare(password: string, cryptedPassword: string): Promise<Boolean>;
}
