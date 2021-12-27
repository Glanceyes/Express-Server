import util from "util";
import { Service } from "typedi";
import config from "../../config";
import dotenv from "dotenv";
import { sign, verify, Algorithm, SignOptions, VerifyOptions } from "jsonwebtoken";
import { TokenDTO } from './interface/TokenDTO';

dotenv.config();

@Service()
export class Jwt{
    public generateToken = (id: number, subject: string, expiresIn: string) => {
        return this.tokenGenerator(id, { subject, expiresIn });
    }

    private tokenGenerator = (id: number, { subject, expiresIn }: TokenDTO) => {
        const algorithm = <Algorithm>config.jwt.algorithm;
        const jwtOptions = <SignOptions>{ algorithm, expiresIn, subject };

        return ({ id }) => sign({ id }, config.jwt.secret, jwtOptions);
    }

    public decodeToken = ({ token } : TokenDTO) => {
        const algorithm = <Algorithm>config.jwt.algorithm;
        const jwtOptions = <VerifyOptions>{ algorithms: [algorithm]};

        const decodedToken = verify(token, config.jwt.secret, jwtOptions);
        if (!decodedToken) {
            throw new Error();
        }

        return decodedToken;
    }
}