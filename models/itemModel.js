const db = require('../config/database');

class ItemModel {
    async findAll() {
        try {
            const [results] = await db.query("SELECT * FROM items");
            return results;
        } catch (error) {
            console.error('Error al obtener items:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const [results] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
            return results;
        } catch (error) {
            console.error('Error al obtener item por ID:', error);
            throw error;
        }
    }

    async create(name, description, price) {
        try {
            const [results] = await db.query(
                "INSERT INTO items (name, description, price) VALUES (?, ?, ?)", 
                [name, description, price]
            );
            return {
                id: results.insertId,
                name, 
                description, 
                price
            };
        } catch (error) {
            console.error('Error al crear item:', error);
            throw error;
        }
    }

    async update(id, name, description, price) {
        try {
            const [result] = await db.query(
                "UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?", 
                [name, description, price, id]
            );
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Error al actualizar item:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query("DELETE FROM items WHERE id = ?", [id]);
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Error al eliminar item:', error);
            throw error;
        }
    }

    async search(searchTerm) {
        try {
            const [results] = await db.query(
                "SELECT * FROM items WHERE name LIKE ?", 
                [`%${searchTerm}%`]
            );
            return results;
        } catch (error) {
            console.error('Error al buscar items:', error);
            throw error;
        }
    }
}

module.exports = new ItemModel();