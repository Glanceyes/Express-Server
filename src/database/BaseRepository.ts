import { getRepository, EntityTarget, Repository } from "typeorm";

export class BaseRepository<T>{
    protected repository: Repository<T>;
    constructor(entityClass: EntityTarget<T>) {
        this.repository = getRepository(entityClass);
        
    }
}