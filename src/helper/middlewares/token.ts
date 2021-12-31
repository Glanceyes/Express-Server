import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Api400Error } from "../utils/error/baseError";
import { Jwt } from "../utils/jwt";

export const refreshToken = async(
    req: Request, res: Response, next: NextFunction) => {
    const jwtInstance = Container.get(Jwt);
    const refreshToken = jwtInstance.unpackBearer({
        BearerToken: req.cookies.refreshToken
    })
    // Access Token과 Refresh Token이 없으면 Error
    if (!refreshToken){
        throw new Api400Error("Access Token과 Refresh Token이 유효하지 않습니다.");
    }

    const decodedToken: any = jwtInstance.decodeToken({ token: refreshToken });
    if (!decodedToken) {
        throw new Api400Error("Access Token과 Refresh Token이 유효하지 않습니다.");
    }

    // Access Token은 없고 Refresh Token은 유효하면 Access Token 재발급

    const { id } = decodedToken;
    const newAccessToken = jwtInstance.generateToken("ACCESS TOKEN", "10h");
    
    res.status(200).send({
        newAccessToken: newAccessToken({ id }),
        message: "Token Regenerated",
    });

    next();
}