import pool from '../db';
import User from '../models/user.model';

class UserRepository{

    async findAllUsers() {
        const query = 'select uuid, username from application_user';
        const poolPrommise = pool.promise();
        const [rows] = await poolPrommise.query(query);
        console.log(rows);
        return rows;
    };

    async findUserById(uuid: string){
        const values = [uuid];
        const query = 'SELECT uuid, username FROM `application_user` WHERE `uuid` = ?';
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
}

export default new UserRepository();