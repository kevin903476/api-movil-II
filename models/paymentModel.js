//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PaymentModel {
    async insertPaymentofStudent(paymentStudent) {
        const { tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, tipo_pago, cupon_id} = paymentStudent
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
    async confirmPayment(pago_id, estado){
        try{
            const result = await db.query(
                'CALL sp_procesar_factura_deduccion(?, ?)',
                [pago_id, estado]
            );
            return result;
        }catch(error){
            console.error('Error in confirmPayment:', error);
            throw error;
        }
    }
}

module.exports = new PaymentModel();