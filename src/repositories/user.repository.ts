import pool from '../db';
import User from '../models/user.model';

class UserRepository{

    async findAllUsers() {
        const query = 'select id, username from application_user';
        const poolPrommise = pool.promise();
        const [rows] = await poolPrommise.query(query);
        console.log(rows);
        return rows;
    };

    async findUserById(id: number){
        const values = [id];
        const query = 'SELECT id, username FROM `application_user` WHERE `id` = ?';
        const poolPrommise = pool.promise();
        const [rows] = await poolPrommise.query(query, values);
        return rows;
    }

    async create(user: User) {
        const script = 'insert into application_user(username, password) values (?, AES_ENCRYPT(?, "secret"));';
        const values = [user.username, user.password];
        const poolPrommise = pool.promise();
        await poolPrommise.query(script, values);
        const [LAST_INSERT_ID] = await poolPrommise.query('select LAST_INSERT_ID();');
        const id = LAST_INSERT_ID;
        return id;
    }

    async delete(id: number) {
        const query = 'delete from application_user where `id` = ?';
        const poolPrommise = pool.promise();
        const user = await this.findUserById(id);
        if(!user) return "Registro não encontrado";
        const result = await poolPrommise.query(query, id)
        return result;
    }

    async update(id: number, user: User){
        const query = "update application_user set username = ?, password = AES_ENCRYPT(?, 'secret') where id = ?;";
        const poolPrommise = pool.promise();
        const userToUpdate = await this.findUserById(id);
        if(!userToUpdate) return "Registro não encontrado";
        const result = await poolPrommise.query(query, [user.username, user.password, id]);
        return result;
    }
}

export default new UserRepository();