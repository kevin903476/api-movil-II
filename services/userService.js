const bcryptjs = require('bcryptjs');
const UserRegisterModel = require('../models/userRegister');

class UserService {
    async getAll() {
        return await UserRegisterModel.getAll();
    }
    async registerEstudiante(estudiante) {
       estudiante.password = await bcryptjs.hash(estudiante.password, 10);
        return await UserRegisterModel.registerEstudiante(estudiante);
    }
}
module.exports = new UserService();