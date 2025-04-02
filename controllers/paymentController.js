//@ts-check
const PaymentService = require('../services/paymentService');
const UserService = require('../services/userService');

const insertPaymentOfStudent = async (req, res) => {
    try {
        const { tutoria_id, profesor_id, monto, comprobante, num_transferencia, tipo_pago, cupon_id } = req.body;
        const estudiante = await UserService.getStudentByUserId(req.user.id);
        const estudiante_id = estudiante.estudiante_id;

        if (!estudiante_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }

        const paymentStudent = {
            tutoria_id,
            profesor_id,
            estudiante_id,
            monto,
            comprobante,
            num_transferencia,
            tipo_pago,
            cupon_id
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
            message: 'Error al registrar pago',
            error: error.message
        });
    }
}
const confirmPaymentOfStudent = async (req, res) => {
    try {
        const { payment_id, estado } = req.body;
        const paymentOfStudent = await PaymentService.confirmPaymentOfStudent(payment_id, estado);
        return res.status(200).json({
            success: true,
            message: 'Pago confirmado correctamente',
            data: paymentOfStudent
        });

    } catch (error) {
        console.error('Error al confirmar pago:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al confirmar pago',
            error: error.message
        });
    }
}

module.exports = {
    insertPaymentOfStudent,
    confirmPaymentOfStudent
}