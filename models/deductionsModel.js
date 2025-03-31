//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class DeductionsModel { //deducciones se relaciona con facturas y pagos
    async getbillProfessor(profesor_id) {  //obtener factura del profesor
        try {
            const result = await db.query('SELECT * FROM vista_facturas_profesor WHERE profesor_id = ?', [profesor_id]);
            console.log('Resultado de getbillProfessor:', result);
            return result && result.length > 0 ? result : [];
        } catch (error) {
            console.error('Error en getbillProfessor:', error);
            throw error;
        }
    }
    async getDetailsBillProfesssor(profesor_id) {
        try {
            const result = await db.query('SELECT * FROM vista_detalle_facturas WHERE profesor_id = ?', [profesor_id]);
            console.log('Resultado de getDetailsBillProfesssor:', result);
            return result && result.length > 0 ? result : [];
        } catch (error) {
            console.error('Error en getDetailsBillProfesssor:', error);
            throw error;
        }
    }
    async getTotalNetInvoicesTeacher(profesor_id) {
        try {
            const result = await db.query('CALL sp_total_neto_facturas_profesor(?)', [profesor_id]);
            console.log('Resultado de getTotalNetInvoicesTeacher:', result);
            if (result[0] && result[0].length > 0) {
                return result[0][0]; // Devuelve el primer registro
            }
            return null;
        } catch (error) {
            console.error('Error en getTotalNetInvoicesTeacher:', error);
            throw error;
        }
    }
}

module.exports = new DeductionsModel();