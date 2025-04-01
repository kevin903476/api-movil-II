//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class CatalogModel {
    async catalogUniversity() {
        try {
            const result = await db.query('SELECT * FROM vista_universidades');
            const universidades = result;
            console.log('Resultado de la consulta:', universidades);
            return universidades;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
    async catalogCourse() {
        try {
            const result = await db.query('SELECT * FROM vista_cursos_completa');
            const cursos = result;
            console.log('Resultado de la consulta:', cursos);
            return cursos;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
    async catalogCareer() {
        try {
            const result = await db.query('SELECT * FROM vista_catalogo_carreras');
            const carreras = result;
            console.log('Resultado de la consulta:', carreras);
            return carreras;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
    async catalogHeadquarters() {
        try {
            const result = await db.query('SELECT * FROM vista_catalogo_sedes');
            const sedes = result;
            console.log('Resultado de la consulta:', sedes);
            return sedes;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
    async catalogRoles() {
        try {
            const result = await db.query('SELECT * FROM vista_catalogo_roles');
            const roles = result;
            console.log('Resultado de la consulta:', roles);
            return roles;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
      async catalogEnclosure(sede_id = null) {
        try {
            let query = 'SELECT * FROM vista_catalogo_recintos';
            let params = [];
            
            if (sede_id) {
                query += ' WHERE sede_id = ?';
                params.push(sede_id);
            }
            
            const result = await db.query(query, params);
            const recintos = result;
            console.log('Resultado de la consulta:', recintos);
            return recintos;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
    async catalogCoupons() {
        try {
            const result = await db.query('SELECT * FROM vista_catalogo_cupones');
            const cupones = result;
            console.log('Resultado de la consulta:', cupones);
            return cupones;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }

    async universitiesWithAllInformation() {
        try {
            const result = await db.query('SELECT * FROM vista_universidades_completa');
            const universidades = result;
            console.log('Resultado de la consulta:', universidades);
            return universidades;
        } catch (error) {
            console.error('Error al obtener catalogo:', error);
            throw error;
        }
    }
}
module.exports = new CatalogModel();