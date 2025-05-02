//@ts-check
const PaymentService = require('../services/paymentService');
const UserService = require('../services/userService');

const updatePaymentOfStudent = async (req, res) => { //Realmente no inserta sino que actualiza el pago del estudiante
    try {
        let comprobante = null;
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        if (req.file && req.file.path) {
            comprobante = req.file.path;
        }
        const { pago_id, monto, num_transferencia, tipo_pago, cupon_id } = req.body;
        const estudiante = await UserService.getStudentByUserId(req.user.id);
        const estudiante_id = estudiante.estudiante_id;

        if (!estudiante_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }

        const paymentStudent = {
            pago_id,
            monto,
            comprobante,
            num_transferencia,
            tipo_pago,
            cupon_id
        };
        const paymentOfStudent = await PaymentService.updatePaymentOfStudent(paymentStudent);
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

const pendingPaymentsProfessor = async (req, res) => {
    try {
        const profesor = await UserService.getProfesorByUserId(req.user.id);
        const profesor_id = profesor.profesor_id

        if (!profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }

        const pendingPayments = await PaymentService.pendingPaymentsProfessor(profesor_id);
        return res.status(201).json({
            success: true,
            message: 'Pagos pendientes del profesor correctamente obtenidos',
            data: pendingPayments
        });

    } catch (error) {
        console.error('Error al obtener pendientes del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pendientes del profesor',
            error: error.message
        });
    }
}

const pendingPaymentsStudent = async (req, res) => {
    try {
        const estudiante = await UserService.getStudentByUserId(req.user.id);
        const estudiante_id = estudiante.estudiante_id;

        if (!estudiante_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }

        const pendingPayments = await PaymentService.pendingPaymentsStudent(estudiante_id);
        return res.status(201).json({
            success: true,
            message: 'Pagos pendientes del estudiante correctamente obtenidos',
            data: pendingPayments
        });

    } catch (error) {
        console.error('Error al obtener pendientes del estudiante:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pendientes del estudiante',
            error: error.message
        });
    }
}

const getPaymentsProfessor = async (req, res) => {
    try {
        const payments = await PaymentService.getPaymentsProfessor();
        console.log('Pagos obtenidos:', payments);

        return res.status(200).json({
            success: true,
            message: 'Pagos obtenidos correctamente',
            data: payments
        });
    } catch (error) {
        console.error('Error al obtener los Pagos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los Pagos'
        });
    }
};


const confirmPaymentOfStudent = async (req, res) => {
    try {
        const { payment_id, estado } = req.body;
        const { mensaje } = await PaymentService.confirmPaymentOfStudent(payment_id, estado);

        return res.status(200).json({
            success: true,
            message: mensaje
        });

    } catch (error) {
        console.error('Error al confirmar pago:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al confirmar pago',
            error: error.message
        });
    }
};


const getPaymentDetails = async (req, res) => {
    try {
        const profesorId = await UserService.getProfesorByUserId(req.user.id);
        const pendingPayments = await PaymentService.pendingPaymentsProfessor(profesorId.profesor_id);
        console.log('Pagos pendientes:', pendingPayments);

        return res.status(200).json({
            success: true,
            message: 'Pagos pendientes obtenidos correctamente',
            data: pendingPayments
        });
    } catch (error) {
        console.error('Error al obtener pagos pendientes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pagos pendientes',
            error: error.message
        });
    }

};

const getPendingPaymentsStudentsTeacher = async (req, res) => {
    try {
        const profesorId = await UserService.getProfesorByUserId(req.user.id);
        const pendingPayments = await PaymentService.getPendingPaymentsStudentsTeacher(profesorId.profesor_id);
        console.log('Pagos pendientes:', pendingPayments);

        return res.status(200).json({
            success: true,
            message: 'Pagos pendientes obtenidos correctamente',
            data: pendingPayments
        });
    } catch (error) {
        console.error('Error al obtener pagos pendientes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener pagos pendientes',
            error: error.message
        });
    }
}

module.exports = {
    updatePaymentOfStudent,
    confirmPaymentOfStudent,
    pendingPaymentsProfessor,
    pendingPaymentsStudent,
    getPaymentsProfessor,
    getPaymentDetails,
    getPendingPaymentsStudentsTeacher
}