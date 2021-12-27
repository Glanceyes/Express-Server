import Joi from "joi";
import Container from "typedi";
import { Hashing } from "../../utils/hashing";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../../services/userService";
import { StatusCode } from "../../utils/error/httpStatusCode";
import { 
    Api400Error, 
    Api401Error, 
    Api403Error, 
    Api404Error, 
    Api409Error 
} from "../../utils/error/baseError";
import { 
    CreateUserValidSchema, 
    loginValidSchema, 
    PasswordValidSchema 
} from "./schema/userValidSchema";

export const createUserValidation = async (
    req: Request, res: Response, next: NextFunction) => {
    const schema = CreateUserValidSchema;

    const { value, error } = schema.validate(req.body);
    if (error){
        console.log(error);
        throw new Api409Error(error.message);
    }

    req.body = value;
    const { email, phone_number } = req.body;

    const userServiceInstance = Container.get(UserService);
    const registeredEmail = await userServiceInstance.getUserByEmail(email);

    if (registeredEmail){
        throw new Api400Error(`${registeredEmail.email}은 이미 사용 중인 이메일입니다.`);
    }

    const registeredPhoneNumber = await userServiceInstance.getUserByPhoneNumber(phone_number);
    
    if (registeredPhoneNumber){
        throw new Api400Error(`${registeredPhoneNumber.phone_number}은 이미 등록된 휴대전화 번호입니다.`);
    }

    next();
}

export const passwordValidation = async (
    req: Request, res: Response, next: NextFunction) => {
    const schema = PasswordValidSchema;
    
    const { value, error } = schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
    });

    if (error){
        console.log(error);
        throw new Api409Error(error.message);
    }

    req.body = value;
    const { password, newPassword, id } = req.body;

    const userServiceInstance = Container.get(UserService);
    const userInfo = await userServiceInstance.getUserById(id);
    const verifiedUser = await userServiceInstance.verifyUserPassword(password, userInfo.password);
    if (!verifiedUser){
        throw new Api400Error("비밀번호가 일치하지 않습니다.");
    }
    const hashedNewPassword = await userServiceInstance.hashUserPassword(newPassword);

    req.body.newPassword = hashedNewPassword;
    next();
}

export const loginValidation = async(
    req: Request, res: Response, next: NextFunction) => {
    
    const schema = loginValidSchema;

    const { value, error } = schema.validate(req.body);
    if (error){
        console.log(error);
        throw new Api409Error(error.message);
    }

    req.body = value;
    const { email, password } = req.body;

    const userServiceInstance = Container.get(UserService);
    const userInfo = await userServiceInstance.getUserByEmail(email);

    if (!userInfo){
        throw new Api404Error("해당 사용자는 존재하지 않습니다.");
    }

    req.body.validUser = userInfo;
    const verifiedUser = await userServiceInstance.verifyUserPassword(password, userInfo.password);
    if (!verifiedUser){
        throw new Api400Error("비밀번호를 확인해 주세요.");
    }

    next();
}