//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PaymentModel {
    async insertPaymentofStudent(paymentStudent) {
        const { tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, modalidad, cupo_id} = paymentStudent
        try {
            const result = await db.query(
                'CALL sp_insertar_pago(?, ?, ?, ?, ?, ?, ?, ?)',
                [tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, modalidad, cupo_id]
            );
            return result;
        } catch (error) {
            console.error('Error in insertPaymentofStudent:', error);
            throw error;
        }
    }
}

module.exports = PaymentModel;