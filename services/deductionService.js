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
}
module.exports = new DeductionService();