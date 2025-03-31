//@ts-check
const DeductionsModel = require('../models/deductionsModel');

class DeductionService {
    async getBillProfessor(profesor_id) {  
        return await DeductionsModel.getbillProfessor(profesor_id);
    }
    async getDetailsBillProfesssor(profesor_id){
        return await DeductionsModel.getDetailsBillProfesssor(profesor_id);
    }
    async getTotalNetInvoicesTeacher(profesor_id){
        return await DeductionsModel.getTotalNetInvoicesTeacher(profesor_id);
    }
   
    async getDeductionProfessor(profesor_id) {
        return await DeductionsModel.getDeductionProfessor(profesor_id);
    }

    async payMultipleDeductions(numero_tranferencia, comprobante, profesor_id, deducciones_ids) {
        const deduccionesIdsString = Array.isArray(deducciones_ids) 
            ? deducciones_ids.join(',') 
            : deducciones_ids;
            
        return await DeductionsModel.payMultipleDeductions(
            numero_tranferencia, 
            comprobante, 
            profesor_id, 
            deduccionesIdsString
        );
    }
}
module.exports = new DeductionService();