const PointModel = require('../models/point');

class PointService {
    async getPoints(estudiante_id){
        try {
            const result = await PointModel.getPoints(estudiante_id);
            const puntos = result;
            console.log('Resultado de la consulta:', puntos);
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos:', error);
            throw error;
        }
    }
}
module.exports = new PointService();