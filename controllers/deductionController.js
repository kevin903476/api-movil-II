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
            message: 'Total deducción a pagar obtenida correctamente',
            data: detailsBillProfessor
        });
    } catch (error) {
        console.error('Error al obtener total deducción a pagar:', error);
        return res.status(500).json({
            success: false,
            message: 'Eror al obtener total deducción a pagar',
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


const payMultipleDeductions = async (req, res) => {
    try {

        const comprobanteUrl = req.file?.path ?? null;
  
      const { numero_tranferencia, deducciones_ids } = req.body;
      if (!numero_tranferencia || !deducciones_ids) {
        return res.status(400).json({
          success: false,
          message: 'Faltan datos requeridos'
        });
      }
  
      let raw = deducciones_ids;
      if (typeof raw === 'string') {
        raw = raw.replace(/^\[|\]$/g, '');
      }
  
      const idsArray = Array.isArray(raw)
        ? raw
        : raw.split(',').map(id => id.trim());
      const idsString = idsArray.join(',');
  
      const profesor = await UserService.getProfesorByUserId(req.user.id);
      if (!profesor?.profesor_id) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }
  
      await DeductionService.payMultipleDeductions({
        profesor_id: profesor.profesor_id,
        numero_tranferencia,
        deducciones_ids: idsString,
        comprobante: comprobanteUrl
      });
  

      return res.status(200).json({
        success: true,
        message: 'Pagos de deducciones registrados correctamente'
      });
  
    } catch (error) {
      console.error('Error al registrar pagos de deducciones:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al registrar pagos de deducciones',
        error: error.message
      });
    }
  };
  

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
};

const getAllDeductionsPaid = async (req, res) => {
    try {
        const deductionsPaid = await DeductionService.getAllDeductionsPaid();
        return res.status(200).json({
            success: true,
            message: 'Deducciones pagadas obtenidas correctamente',
            data: deductionsPaid
        });
    } catch (error) {
        console.error('Error al obtener deducciones pagadas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener deducciones pagadas',
            error: error.message
        });
    }
}
const getAllDeductionsByProfessor = async (req, res) => {
    try {
         const profesor = await UserService.getProfesorByUserId(req.user.id);
         const profesor_id = profesor.profesor_id;
        const deductionsPaid = await DeductionService.getAllDeductionsByProfessor(profesor_id);
        return res.status(200).json({
            success: true,
            message: 'Deducciones pagadas obtenidas correctamente',
            data: deductionsPaid
        });
    } catch (error) {
        console.error('Error al obtener deducciones pagadas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener deducciones pagadas',
            error: error.message
        });
    }
}

module.exports = {
    getBillProfessor,
    getDetailsBillProfesssor,
    getTotalNetInvoicesTeacher,
    payMultipleDeductions,
    getDeductionProfessor,
    getAllDeductionsPaid,
    getAllDeductionsByProfessor
}