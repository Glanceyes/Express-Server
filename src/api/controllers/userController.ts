import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { UserService } from "../../services/userService";

export const createUser = async(req: Request, res: Response) => {
    const userServiceInstance = Container.get(UserService);
    await userServiceInstance.insertUser(req.body);
    res.status(200).send({ message: "회원가입 성공"});
};

export const login = async(req: Request, res: Response) => {
    const { id } = req.body.validUser;
    const userServiceInstance = Container.get(UserService);
    const { accessToken, refreshToken } = await userServiceInstance.getToken({ id });
    
    res.status(200).cookie("refreshToken", refreshToken, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
    })
    .send({
        accessToken,
        refreshToken,
        message: "로그인 성공"
    })
}

export const updateUserProfile = async (req: Request, res: Response) => {
    const userServiceInstance = Container.get(UserService);
    await userServiceInstance.updateUser(req.body);
    res.status(200).send({ message: "회원정보 수정 완료"});
}