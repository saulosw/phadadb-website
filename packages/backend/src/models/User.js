const pool = require('../config/database');

class User {

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        try {
             const { rows } = await pool.query(query, [email]);
             return rows[0];
        } catch (error) {
            console.error('Error to find User by email:', error);
            throw error;
        }
    }

    static async createNewUser(fullName, email, hashedPassword) {
        const query = `
            INSERT INTO users (full_name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        try {
            const { rows } = await pool.query(query, [fullName, email, hashedPassword]);
            return rows[0];
        } catch (error) {
            console.error('Error to create new user:', error);
            throw error;
        }
    }
}

module.exports = User;