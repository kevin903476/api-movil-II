const ItemModel = require('../models/itemModel');

getAllItems = async (req, res) => {
    try {
        const items = await ItemModel.findAll();
        res.status(200).json({ data: items });
    } catch (error) {
        console.error('Error al obtener items:', error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
};

getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await ItemModel.findById(id);

        if (items.length === 0) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }

        res.json({ data: items[0] });
    } catch (error) {
        console.error('Error al obtener item:', error);
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

createItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newItem = await ItemModel.create(name, description, price);
        res.status(201).json({ data: newItem });
    } catch (error) {
        console.error('Error al crear item:', error);
        res.status(500).json({ error: 'Error al insertar el registro' });
    }
};

updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const updated = await ItemModel.update(id, name, description, price);

        if (updated) {
            res.json({ message: 'Registro actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar item:', error);
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await ItemModel.delete(id);

        if (deleted) {
            res.json({ message: 'Registro eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar item:', error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};

searchItems = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const items = await ItemModel.search(searchTerm);
        res.json({ data: items });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
    //exportar las funciones sin necesidad del export.
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    searchItems
}