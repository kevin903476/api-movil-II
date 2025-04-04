const PaymentModel = require('../models/paymentModel');
const ImageService = require('./imageService'); // Asegúrate de importar el servicio de imágenes
class PaymentService {
   // ...existing code...
    
   async insertPaymentofStudent(paymentStudent) {
    try {
        // Comprobar si el comprobante es una imagen en base64
        if (paymentStudent.comprobante && paymentStudent.comprobante.startsWith('data:image')) {
            // Guardar la imagen y obtener la ruta
            const imagePath = await ImageService.saveBase64Image(
                paymentStudent.comprobante, 
                'comprobantes'
            );
            
            // Actualizar el objeto con la ruta de la imagen
            paymentStudent.comprobante = imagePath;
        }
        
        // Continuar con el proceso normal
        return await PaymentModel.insertPaymentofStudent(paymentStudent);
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