//@ts-check
const DeductionService = require('../services/deductionService');
const UserService = require('../services/userService');

const getBillProfessor = async (req, res) => {
    try {
        // Obtener profesor_id usando el usuario_id del token
        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;
        const billProfessor = await DeductionService.getBillProfessor(profesor_id);

        return res.status(200).json({
            success: true,
            message: 'Facturas obtenidas correctamente',
            data: billProfessor
        });
    } catch (error) {
        console.error('Error al obtener factura del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener factura del profesor',
            error: error.message
        });
    }
}

const getDetailsBillProfesssor = async (req, res) => {
    try {
        // Obtener profesor_id usando el usuario_id del token
        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;
        const detailsBillProfessor = await DeductionService.getDetailsBillProfesssor(profesor_id);

        return res.status(200).json({
            success: true,
            message: 'Detalles de la factura obtenidos correctamente',
            data: detailsBillProfessor
        });
    } catch (error) {
        console.error('Error al obtener detalles de la factura del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener detalles de la factura del profesor',
            error: error.message
        });
    }
}

const getTotalNetInvoicesTeacher = async (req, res) => {
    try {
        // Obtener profesor_id usando el usuario_id del token
        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;
        const totalNetInvoicesTeacher = await DeductionService.getTotalNetInvoicesTeacher(profesor_id);

        return res.status(200).json({
            success: true,
            message: 'Total neto de facturas obtenidas correctamente',
            data: totalNetInvoicesTeacher
        });
    } catch (error) {
        console.error('Error al obtener total neto de facturas del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener total neto de facturas del profesor',
            error: error.message
        });
    }
}
const payDeduction = async (req, res) => {
    try {
        const { numero_tranferencia, comprobante, deduccion_id } = req.body;

        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;

        if (!numero_tranferencia || !comprobante || !deduccion_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos'
            });
        }

        await DeductionService.payDeduction(numero_tranferencia, comprobante, profesor_id, deduccion_id);

        return res.status(200).json({
            success: true,
            message: 'Pago de deducción registrado correctamente'
        });
    } catch (error) {
        console.error('Error al registrar pago de deducción:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al registrar pago de deducción',
            error: error.message
        });
    }
}
const insertDeductionPaid = async (req, res) => {
    try {
        const { numero_tranferencia, comprobante, deduccion_id } = req.body;

        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;

        if (!numero_tranferencia || !comprobante || !deduccion_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos'
            });
        }

        await DeductionService.insertDeductionPaid(numero_tranferencia, comprobante, profesor_id, deduccion_id);

        return res.status(200).json({
            success: true,
            message: 'Pago de deducción registrado correctamente'
        });
    } catch (error) {
        console.error('Error al registrar pago de deducción:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al registrar pago de deducción',
            error: error.message
        });
    }
   
}
const getDeductionProfessor = async (req, res) => {
    try {
        const profesor = await UserService.getProfesorByUserId(req.user.id);

        if (!profesor || !profesor.profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

        const profesor_id = profesor.profesor_id;
        const deductionProfessor = await DeductionService.getDeductionProfessor(profesor_id);

        return res.status(200).json({
            success: true,
            message: 'Deducciones obtenidas correctamente',
            data: deductionProfessor
        });
    } catch (error) {
        console.error('Error al obtener deducciones del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener deducciones del profesor',
            error: error.message
        });
    }
}

module.exports = {
    getBillProfessor,
    getDetailsBillProfesssor,
    getTotalNetInvoicesTeacher,
    payDeduction,
    insertDeductionPaid,
    getDeductionProfessor
}