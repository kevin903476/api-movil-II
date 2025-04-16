//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class UserRegisterModel {
  async findByEmail(email) {
    const rows = await db.query(
      `SELECT 
      u.*, 
      e.carnet, 
      u.universidad_id, 
      u.sede_id, 
      u.recinto_id, 
      u.carrera_id, 
      uni.nombre AS universidad_nombre, 
      s.nombre AS sede_nombre, 
      r.nombre AS recinto_nombre, 
      c.nombre AS carrera_nombre 
  FROM usuarios u
  LEFT JOIN estudiantes e ON u.usuario_id = e.usuario_id
  LEFT JOIN universidades uni ON u.universidad_id = uni.universidad_id
  LEFT JOIN sedes s ON u.sede_id = s.sede_id
  LEFT JOIN recintos r ON u.recinto_id = r.recinto_id
  LEFT JOIN carreras c ON u.carrera_id = c.carrera_id
  WHERE u.email = ?;
  `,
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
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
  async verifyExistingEmail(email) {
    try {
      const result = await db.query('CALL sp_verificar_email_existente(?)', [email]);
      const mensaje = result?.[0]?.[0]?.mensaje;
      return mensaje;
    } catch (error) {
      console.error('Error en verifyExistingEmail:', error);
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
  async getProfilesProfesors() {
    try {
        const result = await db.query('SELECT * FROM vista_obtener_perfiles_profesores');
        const perfiles = result;
        console.log('Resultado de la consulta:', perfiles);
        return perfiles;
    } catch (error) {
        console.error('Error en vista_obtener_perfiles_profesores:', error);
        throw error;
    }
}
  async getProfileProfesor(usuario_id) {
    try {
      const result = await db.query('CALL sp_obtener_perfil_profesor(?)', [usuario_id]);
      console.log('Resultado de getProfileProfesor(Model):', result);
      if (result[0] && result[0].length > 0) {
        return result[0][0];
      }
      return null; 
    } catch (error) {
      console.error('Error in getProfileProfesor(Model):', error);
      throw error;
    }
  }

}

module.exports = new UserRegisterModel();