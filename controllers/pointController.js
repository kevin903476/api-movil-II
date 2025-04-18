const PointService = require('../services/pointService');

const getPoints = async (req, res) => {
    try {
        const estudiante_id = req.params.estudiante_id;
        const puntos = await PointService.getPoints(estudiante_id);
        console.log('Puntos obtenidos:', puntos);
        return res.status(200).json({
            success: true,
            message: 'Puntos obtenidos correctamente',
            data: puntos
        });
    } catch (error) {
        console.error('Error al obtener puntos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener puntos'
        });
    }
}
module.exports = {
    getPoints
}