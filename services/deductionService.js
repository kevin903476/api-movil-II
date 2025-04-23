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

    async payMultipleDeductions(deducciones) {
        try {
            return await DeductionsModel.payMultipleDeductions(deducciones);
        } catch (error) {
            console.error('Error en payMultipleDeductions:', error);
            throw error;
        }
    }
    async getAllDeductionsPaid() {
        try {
            return await DeductionsModel.getAllDeductionsPaid();
        } catch (error) {
            console.error('Error en getAllDeductionsPaid:', error);
            throw error;
        }
    }
}
module.exports = new DeductionService();