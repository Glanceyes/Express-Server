import { Service } from "typedi";
import config from "../../config";
import dotenv from "dotenv";
import { sign, verify, Algorithm, SignOptions, VerifyOptions } from "jsonwebtoken";
import { TokenDTO } from './interface/TokenDTO';
import { Api401Error, Api403Error } from "./error/baseError";

dotenv.config();

@Service()
export class Jwt{
    public generateToken = (subject: string, expiresIn: string) => {
        return this.tokenGenerator({ subject, expiresIn });
    }

    private tokenGenerator = ({ subject, expiresIn }: TokenDTO) => {
        const algorithm = <Algorithm>config.jwt.algorithm;
        const jwtOptions = <SignOptions>{ algorithm, expiresIn, subject };

        return ({ id }) => sign({ id }, config.jwt.secret, jwtOptions);
    }

    public decodeToken = ({ token } : TokenDTO) => {
        const algorithm = <Algorithm>config.jwt.algorithm;
        const jwtOptions = <VerifyOptions>{ algorithms: [algorithm]};

        const decodedToken = verify(token, config.jwt.secret, jwtOptions);
        if (!decodedToken) {
            throw new Api403Error("Token Expired");
        }

        return decodedToken;
    }

    public unpackBearer = ({ BearerToken }): string => {
        if (!BearerToken || !BearerToken.startsWith("Bearer ")){
            throw new Api401Error("No Authorized Token");
        }
        return BearerToken.split(" ")[1];
    }
}