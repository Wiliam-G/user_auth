import pool from '../db';

class UserRepository{

    async findAllUsers() {
        const poolPrommise = pool.promise();
        const [rows] = await poolPrommise.query('select uuid, username from application_user');
        console.log(rows);
        return rows;
    }
}

export default new UserRepository();