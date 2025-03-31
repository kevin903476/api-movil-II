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
}
module.exports = new PaymentService();