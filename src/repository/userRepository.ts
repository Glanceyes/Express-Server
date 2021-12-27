import { BaseRepository } from "../database/BaseRepository";
import { User } from "../database/entity/User";
import { UserDTO } from "../services/interface/UserDTO";
import { Service } from "typedi";
import { EntityRepository } from "typeorm";

@Service()
@EntityRepository(User)
export class UserRepository extends BaseRepository<User>{
    constructor(){
        super(User);
    }

    public async fetchRowById(_entity, id: number){
        const rowInfo = await this.repository
        .createQueryBuilder()
        .where("id = :id", { id })
        .getOne();

        return { rowInfo };
    }

    public async fetchRowByEmail(_entity, email: string){
        const rowInfo = await this.repository
        .createQueryBuilder()
        .where("email = :email", { email })
        .getOne();

        return { rowInfo };
    }

    public async fetchRowByPhoneNumber(_entity, phone_number: string){
        const rowInfo = await this.repository
        .createQueryBuilder()
        .where("phone_number = :phone_number", { phone_number })
        .getOne();

        return { rowInfo };
    }


    public async insertRow(_entity, data: UserDTO){
        const insertedResult = await this.repository
        .createQueryBuilder()
        .insert()
        .into(_entity)
        .values(data)
        .execute();

        return { insertedResult };
    }

    public async updateRowById(_entity, data: UserDTO){
        const updatedResult = await this.repository
        .createQueryBuilder()
        .update(_entity)
        .set(data)
        .where("id = :id", {id : data.id})
        .execute();
        return { updatedResult };
    }

    public async deleteRowById(entity, id: number){
        const deletedResult = await this.repository
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id : id })
        .execute();

        return { deletedResult };
    }

    public async restoreRowByID(entity, id: number){
        const restoredResult = await this.repository
        .createQueryBuilder()
        .where("id = :id", { id: id })
        .restore()
        .execute();
        
        return { restoredResult }; 
    }
}