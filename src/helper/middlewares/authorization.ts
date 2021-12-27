import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Api400Error, BaseError } from "../utils/error/baseError";
import { Jwt } from "../utils/jwt";
import { StatusCode } from "../utils/error/httpStatusCode";

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

    if (!auth){
        throw new Api400Error("Access Token Expired");
    }

    req.body.id = auth.id;
    
    next();
}