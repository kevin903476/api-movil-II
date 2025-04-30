const PaymentModel = require('../models/paymentModel');

class PaymentService {

   async updatePaymentOfStudent(paymentStudent) {//Realmente no inserta sino que actualiza el pago del estudiante
    try {
        return await PaymentModel.updatePaymentOfStudent(paymentStudent);
    } catch (error) {
        console.error('Error in insertPaymentofStudent service:', error);
        throw error;
    }
}

    async pendingPaymentsProfessor(profesor_id) {
        try {
            return await PaymentModel.pendingPaymentsProfessor(profesor_id);
        } catch (error) {
            console.error('Error in pendingPaymentsProfessor:', error);
            throw error;
        }
    }

    async pendingPaymentsStudent(estudiante_id) {
        try {
            return await PaymentModel.pendingPaymentsStudent(estudiante_id);
        } catch (error) {
            console.error('Error in pendingPaymentsStudent:', error);
            throw error;
        }
    }

    async getPaymentsProfessor() {
        try {
            return await PaymentModel.getPaymentsProfessor();
        } catch (error) {
            console.error('Error in pendingPaymentsStudent:', error);
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
    async getPendingPayments(profesor_id) {
        return await PaymentModel.getPaymentDetails(profesor_id);
    }
    async getPendingPaymentsStudentsTeacher(profesor_id) {
        return await PaymentModel.getPendingPaymentsStudentsTeacher(profesor_id);
    }

}
module.exports = new PaymentService();