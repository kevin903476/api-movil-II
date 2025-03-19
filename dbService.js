const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 20,      // Máximo número de conexiones simultáneas permitidas en el pool
    queueLimit: 0,            // Número máximo de solicitudes en cola (0 = ilimitado)
    acquireTimeout: 10000     // Tiempo máximo para adquirir una conexión antes de generar un error (10 segundos)
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

    // Método ejemplo para obtener todos los registros de una tabla específica
    async getAllItems() {
        try {
            const results = await this.query("SELECT * FROM items");
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    // Método ejemplo para obtener un elemento por ID
    async getItemById(id) {
        try {
            const results = await this.query("SELECT * FROM items WHERE id = ?", [id]);
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    // Método ejemplo para insertar un nuevo item
    async insertItem(name, description, price) {
        try {
            const results = await this.query("INSERT INTO items (name, description, price) VALUES (?, ?, ?)", [name, description, price]);
            return {
                id: results.insertId,
                name: name,
                description: description,
                price: price
            };
        } catch (error) {
            console.error(error);
        }
    }

    // Método ejemplo para actualizar un item
    async updateItem(id, name, description, price) {
        try {
            const result = await this.query("UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?", [name, description, price, id]);
            return result.affectedRows === 1;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Método ejemplo para eliminar un item
    async deleteItem(id) {
        try {
            const result = await this.query("DELETE FROM items WHERE id = ?", [id]);
            return result.affectedRows === 1;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Método ejemplo para buscar items por nombre
    async searchItemsByName(searchTerm) {
        try {
            const results = await this.query("SELECT * FROM items WHERE name LIKE ?", [`%${searchTerm}%`]);
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    // Método ejemplo para contar items
    async countItems() {
        try {
            const results = await this.query("SELECT COUNT(*) as total FROM items");
            return results[0].total;
        } catch (error) {
            console.error(error);
        }
    }

    // Método ejemplo para crear una relación entre tablas
    async associateItemToCategory(itemId, categoryId) {
        try {
            const results = await this.query("INSERT INTO item_categories (item_id, category_id) VALUES (?, ?)", [itemId, categoryId]);
            return results.affectedRows === 1;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

let instance = null;

module.exports = DbService;