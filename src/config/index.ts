import dotenv from "dotenv";
dotenv.config();

// 서버의 환경변수를 설정하여 활용한다.

export default {
    port: process.env.PORT,
    host: process.env.HOST,   
    api: {
        schema: "/basic",
        prefix: "/api",
    },

    jwt: {
        algorithm: process.env.JWT_ALGORITHM || "HS256",
        secret: process.env.SECRET_KEY || 'secret',
    }
};