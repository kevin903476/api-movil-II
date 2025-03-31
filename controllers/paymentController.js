//@ts-check
const PaymentService = require('../services/paymentService');

const insertPaymentOfStudent = async (req, res) => {
    try {
        const { tutoria_id, profesor_id, estudiante_id, monto, comprobante, num_transferencia, tipo_pago, cupo_id} = req.body;
        const paymentStudent = {
            tutoria_id,
            profesor_id,
            estudiante_id,
            monto,
            comprobante,
            num_transferencia,
            tipo_pago,
            cupo_id
        };
        const paymentOfStudent = await PaymentService.insertPaymentofStudent(paymentStudent);
        return res.status(201).json({
            success: true,
            message: 'Pago registrado correctamente',
            data: paymentOfStudent
        });

    } catch (error) {
        console.error('Error al registrar pago:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al registrar pago'
        });
    }
}

module.exports = {
    insertPaymentOfStudent,
}