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
    async payDeduction(numero_tranferencia, comprobante, profesor_id, deduccion_id) {
        return await DeductionsModel.payDeduction(numero_tranferencia, comprobante, profesor_id, deduccion_id);
    }

    async getDeductionProfessor(profesor_id) {
        return await DeductionsModel.getDeductionProfessor(profesor_id);
    }
}
module.exports = new DeductionService();