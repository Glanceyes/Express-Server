import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Api400Error, BaseError } from "../utils/error/baseError";
import { Jwt } from "../utils/jwt";
import { StatusCode } from "../utils/error/httpStatusCode";
import { refreshToken } from "./token";

export const isAuthorized = (
    req: Request, res: Response, next: NextFunction) => {
    const jwtInstance = Container.get(Jwt);
    
    const { authorization } = req.headers;

    const token: string = jwtInstance.unpackBearer({ 
        BearerToken: authorization
    });

    const auth: any = jwtInstance.decodeToken({
        token,
    });

    // Access Token이 없거나 만료되었을 경우
    if (!auth){
        // Refresh Token이 유효한지 확인한다.
        refreshToken;
    }

    req.body.id = auth.id;
    next();
}