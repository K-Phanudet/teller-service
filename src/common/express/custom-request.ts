import { DecodedToken } from "../../common/jwt.js";

export interface CustomRequest extends Request {
    user?: DecodedToken;
}