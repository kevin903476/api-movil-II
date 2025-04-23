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
            const result = await db.query('CALL sp_total_deducciones_profesor(?)', [profesor_id]);
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

    
    async payMultipleDeductions(deducciones) {
        try {
            const { numero_tranferencia, comprobante, profesor_id, deducciones_ids } = deducciones;
            const result = await db.query('CALL sp_insertar_deducciones_pagadas(?, ?, ?, ?)', 
                [numero_tranferencia, comprobante, profesor_id, deducciones_ids]);
            return result;
        } catch (error) {
            console.error('Error en payMultipleDeductions:', error);
            throw error;
        }
    }
    
    async getDeductionProfessor(profesor_id) {
        try {
            const result = await db.query('SELECT * FROM vista_deducciones_profesor WHERE profesor_id = ?', [profesor_id]);
            console.log('Resultado de getDeductionProfessor:', result);
            return result && result.length > 0 ? result : [];
        } catch (error) {
            console.error('Error en getDeductionProfessor:', error);
            throw error;
        }
    }
    
    async getAllDeductionsPaid(){
        try {
            const result = await db.query('SELECT * FROM deducciones_pagadas;');
            console.log('Resultado de getAllDeductions:', result);
            return result && result.length > 0 ? result : [];
        } catch (error) {
            console.error('Error en getAllDeductions:', error);
            throw error;
        }
    }
}

module.exports = new DeductionsModel();