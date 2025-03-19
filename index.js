const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const DbService = require('./dbService');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = DbService.getDbServiceInstance();


// Ruta para insertar un nuevo registro
app.post('/addItem', async (request, response) => {
    const { name, description, price } = request.body;

    try {
        const newItem = await db.insertItem(name, description, price);
        response.status(201).json({ data: newItem });
    } catch (error) {
        console.error('Error al insertar:', error);
        response.status(500).json({ error: 'Error al insertar el registro' });
    }
});

// Ruta para obtener todos los registros
app.get('/getAllItems', async (request, response) => {
    try {
        const data = await db.getAllItems();
        response.json({ data });
    } catch (error) {
        console.error('Error al obtener registros:', error);
        response.status(500).json({ error: 'Error al obtener los registros' });
    }
});

// Ruta más intuitiva para obtener un registro por ID
app.post('/getItemById', async (request, response) => {
    const { id } = request.body;

    try {
        const item = await db.getItemById(id);

        if (item.length === 0) {
            response.status(404).json({ error: 'Registro no encontrado' });
        } else {
            response.json({ data: item });
        }
    } catch (error) {
        console.error('Error al obtener registro:', error);
        response.status(500).json({ error: 'Error al obtener el registro' });
    }
});

// Ruta más intuitiva para buscar registros por nombre
app.post('/searchItems', async (request, response) => {
    const { searchTerm } = request.body;

    try {
        const results = await db.searchItemsByName(searchTerm);
        response.json({ data: results });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        response.status(500).json({ error: 'Error en la búsqueda' });
    }
});


// Ruta más intuitiva para actualizar un registro
app.post('/updateItem', async (request, response) => {
    const { id, name, description, price } = request.body;

    try {
        const updated = await db.updateItem(id, name, description, price);

        if (updated) {
            response.json({ message: 'Registro actualizado correctamente' });
        } else {
            response.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        response.status(500).json({ error: 'Error al actualizar el registro' });
    }
});

// Ruta más intuitiva para eliminar un registro
app.post('/deleteItem', async (request, response) => {
    const { id } = request.body;

    try {
        const deleted = await db.deleteItem(id);

        if (deleted) {
            response.json({ message: 'Registro eliminado correctamente' });
        } else {
            response.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
        response.status(500).json({ error: 'Error al eliminar el registro' });
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));
