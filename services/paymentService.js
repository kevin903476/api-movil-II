const PaymentModel = require('../models/paymentModel');
class PaymentService {
    async insertPaymentofStudent(paymentStudent) {
        try {
            return await PaymentModel.insertPaymentofStudent(paymentStudent);
        } catch (error) {
            console.error('Error in insertPaymentofStudent:', error);
            throw error;
        }
    }
    async confirmPaymentOfStudent(payment_id, estado) {
        try {
            return await PaymentModel.confirmPayment(payment_id, estado);
        } catch (error) {
            console.error('Error in confirmPaymentOfStudent:', error);
            throw error;
        }
    }
}
module.exports = new PaymentService();