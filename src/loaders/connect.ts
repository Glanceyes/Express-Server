import { createConnection, useContainer } from "typeorm";
import * as typedi from "typedi"

const connection = async() => {
    try {
        const connection = await createConnection();
        typedi.Container.set("connection", connection);
    }
    catch (error){
        console.log(error.message);
    }
};

export default connection;