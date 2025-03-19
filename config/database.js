const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 20,
    queueLimit: 0,
    acquireTimeout: 10000
});

const poolPromise = pool.promise();

class DbService {
    // Singleton: patrón para asegurar una única instancia de DbService en toda la aplicación
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    constructor() {
        this.pool = poolPromise; // Asignación del pool de conexiones a la instancia de la clase
    }

    async query(query, params = []) {
        try {
            const [results] = await this.pool.query(query, params);
            return results;
        } catch (error) {
            console.error('Error en la consulta:', error);
            throw error;
        }
    }
}
module.exports = DbService;
