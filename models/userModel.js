const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class UserRegisterModel {

  async findByEmail(email) {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    console.log('Resultado de la consulta:', result); 

    const rows = result[0];
    if (!rows || rows.length === 0) {
      return null;
    }
    console.log('retorno:', rows);
    return rows; 
  } catch (error) {
    console.error('Error en findByEmail:', error);
    throw error;
  }
}


async getAll() {
  try {
    const result = await db.query('SELECT * FROM usuarios');

    console.log('Resultado de getAll:', result); 

    const users = result; 

    return users; 
  } catch (error) {
    console.error('Error en getAll:', error);
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
  async getProfileStudent(usuario_id) {
    try {
      const result = await db.query('CALL sp_obtener_perfil_estudiante(?)', [usuario_id]);
      return result;
    } catch (error) {
      console.error('Error in getProfileStudent(Model):', error);
      throw error;
    }
  }
}

module.exports = new UserRegisterModel();