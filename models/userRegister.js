const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class UserRegisterModel {

  async findByEmail(email) {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    console.log('Resultado de la consulta:', result); // 👀 Depuración

    const rows = result[0]; // ✅ Tomar solo la parte relevante
    if (!rows || rows.length === 0) {
      return null;
    }
    console.log('retorno:', rows[0]);
    return rows[0]; // ✅ Retornar el usuario correctamente
  } catch (error) {
    console.error('Error en findByEmail:', error);
    throw error;
  }
}


  async getAll() {
    try {
      const [users] = await db.query('SELECT * FROM usuarios');
      console.log('users:', users);
      return users;
    } catch (error) {
      throw error;
    }
  }
  async registerEstudiante(estudiante) {
    const { nombre, apellido, email, password, universidad_id, pais_id } = estudiante;
    try {
      const result = await db.query(
        'CALL sp_insertar_estudiante(?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, universidad_id, pais_id]
      );
      return result;
    } catch (error) {
      console.error('Error in registerEstudiante:', error);
      throw error;

    }
  }
  async registerProfesor(profesor) {
    const { nombre, apellido, email, password, universidad_id, pais_id, whatsapp } = profesor;
    try {
      const result = await db.query(
        'CALL sp_insertar_profesor(?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, universidad_id, pais_id, whatsapp]
      );
      return result;
    } catch (error) {
      console.error('Error in registerProfesor:', error);
      throw error;

    }
  }
  async updateProfesor(profesor) {
    const { usuario_id, carrera_id, whatsapp, foto, descripcion } = profesor;
    try {
      const result = await db.query(
        'CALL sp_actualizar_profesor(?, ?, ?, ?, ?)',
        [usuario_id, carrera_id, whatsapp, foto, descripcion]
      );
      return result;
    } catch (error) {
      console.error('Error in updateProfesor:', error);
      throw error;

    }
  }

  async updateEstudiante(estudiante) {
    const { usuario_id, carnet, carrera_id } = estudiante;
    try {
      const result = await db.query(
        'CALL sp_actualizar_estudiante(?, ?, ?)',
        [usuario_id, carnet, carrera_id]
      );
      return result;
      
    } catch (error) {
      console.error('Error in updateEstudiante:', error);
      throw error;
    }
  }

}

module.exports = new UserRegisterModel();