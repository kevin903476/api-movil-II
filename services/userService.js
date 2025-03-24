const bcrypt = require('bcrypt');
const UserRegisterModel = require('../models/userRegister');

class UserService {
    async getAll() {
        return await UserRegisterModel.getAll();
    }
    async registerEstudiante(estudiante) {
       estudiante.password = await bcrypt.hash(estudiante.password, 10);
        return await UserRegisterModel.registerEstudiante(estudiante);
    }
}
module.exports = new UserService();