import dotenv from "dotenv";
dotenv.config();

export default {
    "type": "mysql",
    "host": process.env.HOST || "localhost",
    "port": process.env.PORT || 3306,
    "username": process.env.USERNAME || "root",
    "password": process.env.PASSWORD || "rmflvls619",
    "database": process.env.DATABASE || "basic",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/database/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/database/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 };