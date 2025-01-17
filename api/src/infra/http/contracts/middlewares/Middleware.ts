import { HttpResponse } from "../http";

export interface HttpMiddleware<Request = any, Response = any> {
    handle: (request: Request) => Promise<HttpResponse<Response>>;
}
