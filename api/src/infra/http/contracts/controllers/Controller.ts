import { HttpResponse } from "../index";

export interface HttpController<Request = any, Response = any> {
    handle: (request: Request) => Promise<HttpResponse<Response>>;
}
