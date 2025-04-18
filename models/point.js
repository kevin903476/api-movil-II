//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PointModel {
    async getPoints(estudiante_id) {
        try {
            const result = await db.query('CALL sp_obtener_puntos_actuales(?)', [estudiante_id]);
            const puntos = result;
            console.log('Resultado de la consulta:', puntos);
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos:', error);
            throw error;
        }
    }
}
module.exports = new PointModel();