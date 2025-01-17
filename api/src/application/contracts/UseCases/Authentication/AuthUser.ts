import { UseCase } from "../UseCase";

export type AuthUserInputDto = Record<string, any>;

export type AuthUserOutputDto = Record<string, any> & {
    authenticatedUserId: string;
    authenticatedUserRole: string;
};

export interface AuthUser
    extends UseCase<AuthUserInputDto, AuthUserOutputDto | Error> {}
