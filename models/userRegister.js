const db = require('../config/database');

class UserRegisterModel {
  async registerUser(user) {
    const { nombre, apellido, email, password, rol_id, universidad_id, carrera_id } = user;
    try {
      const [rows] = await db.query(
        'CALL sp_crear_usuario(?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, rol_id, universidad_id, carrera_id]
      );
      return rows;
    } catch (error) {
      console.error('Error in registerUser:', error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

}

module.exports = new UserRegisterModel();