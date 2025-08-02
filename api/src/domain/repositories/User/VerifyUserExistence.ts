export interface VerifyUserExistenceRepository {
    verify: () => Promise<boolean>;
}