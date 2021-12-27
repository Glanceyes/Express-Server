import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { Service } from "typedi";
const saltRounds = 11;

@Service()
export class Hashing{
    public hashingPassword = async (password: string) => {
        const salt = genSaltSync(saltRounds);
        const hashedPassword = hashSync(password, salt);

        return hashedPassword;
    }

    public verifyPassword = (password: string, hashedPassword: string): boolean => {
        return compareSync(password, hashedPassword) || false;
    }
}