const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class UserRegisterModel {
  
  async findByEmail(email) {
    try {
      const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }
  
  async getAll() {
    try {
      const [users] = await db.query('SELECT * FROM usuarios');
      return users;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }
  async registerEstudiante(estudiante){
    const {nombre, apellido, email, password, universidad_id, carrera_id} = estudiante;
    try {
      const result = await db.query(
        'CALL sp_insertar_estudiante(?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, universidad_id, carrera_id]
      );
      return result;
    }catch (error) {
      console.error('Error in registerEstudiante:', error);
      throw error;

    }
}
}

module.exports = new UserRegisterModel();