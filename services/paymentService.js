const PaymentModel = require('../models/paymentModel');

class PaymentService {

    async updatePaymentOfStudent(paymentStudent) {//Realmente no inserta sino que actualiza el pago del estudiante
        try {
            const result = await PaymentModel.updatePaymentOfStudent(paymentStudent);
            const rows = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : [];
            if (rows.length === 0) {
                throw new Error('No se encontró el pago con el ID proporcionado');
            }
            const {
                usuario_id_profesor,
                curso,
                estudiante
            } = rows[0];
            return { usuario_id_profesor, curso, estudiante };
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