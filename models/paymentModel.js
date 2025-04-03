//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PaymentModel {

    async pendingPaymentsProfessor(profesor_id) {
        try {
            const result = await db.query('SELECT * FROM vista_pagos_pendientes_recibidos_profesor WHERE profesor_id = ?', [profesor_id]);
            console.log('Resultado de pendingPaymentsProfessor:', result);
            return result;
        } catch (error) {
            console.error('Error en pendingPaymentsProfessor:', error);
            throw error;
        }
    }

    async getPaymentsProfessor() {
        try {
            const result = await db.query('SELECT * FROM vista_pagos_recibidos_profesor');
            const pagos = result;
            console.log('Resultado de la consulta:', pagos);
            return pagos;
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            throw error;
        }
    }

    async pendingPaymentsStudent(estudiante_id) {
        try {
            const result = await db.query('SELECT * FROM vista_pagos_pendientes_estudiante WHERE estudiante_id = ?', [estudiante_id]);
            console.log('Resultado de pendingPaymentsStudent:', result);
            if (result[0] && result[0].length > 0) {
                return result[0][0]; // Devuelve el primer registro
            }
            return null;
        } catch (error) {
            console.error('Error en pendingPaymentsStudent:', error);
            throw error;
        }
    }


    async insertPaymentofStudent(paymentStudent) {
        const { tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, tipo_pago, cupon_id } = paymentStudent
        try {
            const result = await db.query(
                'CALL sp_insertar_pago(?, ?, ?, ?, ?, ?, ?, ?)',
                [tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, tipo_pago, cupon_id]
            );
            return result;
        } catch (error) {
            console.error('Error in insertPaymentofStudent:', error);
            throw error;
        }
    }
    async confirmPayment(pago_id, estado) {
        try {
            const result = await db.query(
                'CALL sp_procesar_factura_deduccion(?, ?)',
                [pago_id, estado]
            );
            return result;
        } catch (error) {
            console.error('Error in confirmPayment:', error);
            throw error;
        }
    }
}

module.exports = new PaymentModel();