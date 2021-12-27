import { User } from '../database/entity/User';
import { UserDTO } from './interface/UserDTO';
import { UserRepository } from "../repository/userRepository";
import { Service } from "typedi";
import { Jwt } from "../helper/utils/jwt";
import { Hashing } from "../helper/utils/hashing";

@Service()
export class UserService{
    private readonly jwt: Jwt;
    private readonly hash: Hashing;
    private readonly repo: UserRepository;

    constructor(){
        this.jwt = new Jwt();
        this.hash = new Hashing();
        this.repo = new UserRepository;
    }

    public async getUserById(id: number){
        const { rowInfo } = await this.repo.fetchRowById(User, id);
        return rowInfo;
    }

    public async getUserByEmail(email: string){
        const { rowInfo } = await this.repo.fetchRowByEmail(User, email);
        return rowInfo;
    }

    public async getUserByPhoneNumber(phone_number: string){
        const { rowInfo } = await this.repo.fetchRowByPhoneNumber(User, phone_number);
        return rowInfo;
    }

    public async insertUser(data: UserDTO){
        data.password = await this.hashUserPassword(data.password);
        const newUser = await this.repo.insertRow(User, data);
        return newUser;
    }

    public async getToken(data: UserDTO){
        const accessToken = this.jwt.generateToken("ACCESS_TOKEN", "10h");
        const refreshToken = this.jwt.generateToken("REFRESH_TOKEN", "90d");

        return {
            accessToken: accessToken({id: data.id}),
            refreshToken: refreshToken({id: data.id})
        }
    }

    public async changeUserPassword(data: UserDTO){
        const { rowInfo } = await this.repo.fetchRowById(User, data.id);
        rowInfo.password = await this.hashUserPassword(data.password);
        await this.repo.updateRowById(User, rowInfo);
    }

    public async hashUserPassword(password: string): Promise<string>{
        const hashedPassword = await this.hash.hashingPassword(password);
        return String(hashedPassword);
    }

    public async verifyUserPassword(password: string, hashedPassword: string){
        const verifyResult = this.hash.verifyPassword(password, hashedPassword);
        return verifyResult;
    }
}