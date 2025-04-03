//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class UserRegisterModel {

    async findByEmail(email) {
    try {
      const result = await db.query(
        'SELECT u.*, e.carnet, e.universidad_id, e.sede_id, e.recinto_id, e.carrera_id, u.universidad_nombre, s.sede_nombre, r.recinto_nombre, c.carrera_nombre FROM usuarios u LEFT JOIN estudiantes e ON u.usuario_id = e.usuario_id LEFT JOIN universidades u ON e.universidad_id = u.universidad_id LEFT JOIN sedes s ON e.sede_id = s.sede_id LEFT JOIN recintos r ON e.recinto_id = r.recinto_id LEFT JOIN carreras c ON e.carrera_id = c.carrera_id WHERE u.email = ?', 
        [email]
      );
  
      console.log('Resultado de la consulta:', result);
  
      const rows = result[0];
      if (!rows || rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error en findByEmail:', error);
      throw error;
    }
  }
  async getStudentByUserId(usuario_id) {
    try {
      const result = await db.query('CALL sp_obtener_estudiante(?)', [usuario_id]);
      console.log('Resultado de getStudentByUserId:', result);
      if (result[0] && result[0].length > 0) {
        return result[0][0]; // Devuelve el primer registro
      }
      return null;
    } catch (error) {
      console.error('Error en getStudentByUserId:', error);
      throw error;
    }
  }

  async getProfesorByUserId(usuario_id) {
    try {
      const result = await db.query('CALL sp_obtener_profesor(?)', [usuario_id]);
      console.log('Resultado de getProfesorByUserId:', result);
      if (result[0] && result[0].length > 0) {
        return result[0][0]; // Devuelve el primer registro
      }
      return null;
    } catch (error) {
      console.error('Error en getProfesorByUserId:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await db.query('SELECT * FROM vista_usuarios_completa');

      console.log('Resultado de getAll:', result);

      const users = result;

      return users;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  }

  async registerEstudiante(estudiante) {
    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id } = estudiante;
    try {
      const result = await db.query(
        'CALL sp_insertar_estudiante(?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, universidad_id, carrera_id, pais_id]
      );
      return result;
    } catch (error) {
      console.error('Error in registerEstudiante:', error);
      throw error;

    }
  }
  async registerProfesor(profesor) {
    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id, whatsapp } = profesor;
    try {
      const result = await db.query(
        'CALL sp_insertar_profesor(?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, password, universidad_id, carrera_id, pais_id, whatsapp]
      );
      return result;
    } catch (error) {
      console.error('Error in registerProfesor:', error);
      throw error;

    }
  }
  //Actualizar stored procedure para que acepte reseñas
  async updateProfesor(profesor) {
    const { usuario_id, whatsapp, foto, descripcion, nombre, apellido, universidad_id, sede_id, recinto_id, carrera_id } = profesor;
    try {
      const result = await db.query(
        'CALL sp_actualizar_profesor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [usuario_id, whatsapp, foto, descripcion, nombre, apellido, universidad_id, sede_id, recinto_id, carrera_id]
      );
      return result;
    } catch (error) {
      console.error('Error in updateProfesor:', error);
      throw error;

    }
  }

  async updateEstudiante(estudiante) {
    const { usuario_id, nombre, apellido, carnet, universidad_id, sede_id, recinto_id, carrera_id } = estudiante;
    try {
      const result = await db.query(
        'CALL sp_actualizar_estudiante(?, ?, ?, ?, ?, ?, ?, ?)',
        [usuario_id, nombre, apellido, carnet, universidad_id, sede_id, recinto_id, carrera_id]
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
      console.log('Resultado de getProfileStudent(Model):', result);
      if (result[0] && result[0].length > 0) {
        return result[0][0]; // Devuelve el primer registro
      }
      return null; // No se encontró información
    } catch (error) {
      console.error('Error in getProfileStudent(Model):', error);
      throw error;
    }
  }

}

module.exports = new UserRegisterModel();