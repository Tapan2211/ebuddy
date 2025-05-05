const db = require('../config/db');

const createUser = async (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        throw new Error('All fields are required');
    }

    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log("Existing User Check:", existingUser);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
        throw new Error('User with this email already exists');
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
    const [results] = await db.execute(sql, [name, email, password]);
    return results;
}

const getUserByMail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.execute(sql, [email]);
    return results[0];
}

const getAllUsers = async (limit, offset) => {
    // const countSql = 'SELECT * FROM users';

    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    // Get total count of users
    const countQuery = 'SELECT COUNT(*) AS total FROM users';
    const [countResult] = await db.execute(countQuery);
    const total = countResult[0].total;

    // Fetch paginated users
    const query = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;

    const [results] = await db.execute(query);

    return { users: results, total };
}

const getUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [results] = await db.execute(sql, [id]);
    return results[0];
}

const updateUserById = async (id, data) => {
    const { name, email, password } = data;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const [results] = await db.execute(sql, [name, email, password, id]);
    return results;
}

const deleteUserById = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [results] = await db.execute(sql, [id]);
    return results;
}

module.exports = {
    createUser,
    getUserByMail,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}