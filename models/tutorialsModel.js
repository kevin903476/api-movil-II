//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class TutorialsModel {

  async getTutorials({ limit, offset, keyword, clasificacion }) {
    try {
      let query = 'SELECT * FROM vista_cursos_profesor';
      const params = [];
      let whereAdded = false;

      if (keyword && keyword.trim() !== '') {
        query += ' WHERE curso LIKE ?';
        params.push(`%${keyword}%`);
        whereAdded = true;
      }
      if (clasificacion) {
        query += whereAdded ? ' AND clasificacion = ?' : ' WHERE clasificacion = ?';
        params.push(clasificacion);
        whereAdded = true;
      }
      query += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);
      const result = await db.query(query, params);
      console.log('Resultado de la consulta:', result);
      return result;

    } catch (error) {
      console.error('Error al obtener cursos_profesor disponibles:', error);
      throw error;
    }
  }
  async getPendingTutorialProfessor(profesor_id, curso_id, fecha) {
    try {
      const result = await db.query('SELECT * FROM vista_tutorias_pendientes_profesor WHERE profesor_id = ? AND curso_id = ? AND DATE(fecha) = ?', [profesor_id, curso_id, fecha]);
      const cursos = result;
      console.log('Resultado de la consulta:', cursos);
      return cursos;
    } catch (error) {
      console.error('Error al obtener tutoria pendiente:', error);
      throw error;
    }
  }
  async getTutorialsProfessorCourse(profesor_id, curso_id) {
    try {
      const result = await db.query('SELECT * FROM vista_cursos_profesor WHERE profesor_id = ? AND curso_id = ?', [profesor_id, curso_id]);
      const cursos = result;
      console.log('Resultado de la consulta:', cursos);
      return cursos;
    } catch (error) {
      console.error('Error al obtener cursos_profesor disponibles:', error);
      throw error;
    }
  }

  async getScheduledTutorials(estudiante_id) {
    try {
      const result = await db.query(
        'SELECT * FROM vista_tutorias WHERE estudiante_id = ?;',
        [estudiante_id]
      );
      console.log('Resultado de la consulta:', result);
      return result;
    } catch (error) {
      console.error('Error al obtener tutorías agendadas:', error);
      throw error;
    }
  }

  async scheduleTutoring(tutoria) {
    const { profesor_id, estudiante_id, curso_id, fecha, hora_inicio, hora_fin, temas } = tutoria;
    try {
      const result = await db.query(
        'CALL sp_agendar_tutoria(?, ?, ?, ?, ?, ?, ?)',
        [profesor_id, estudiante_id, curso_id, fecha, hora_inicio, hora_fin, temas]
      );
      return result;
    } catch (error) {
      console.error('Error in createCourse:', error);
      throw error;

    }
  }

  async cancelTutorial(tutoria_id) {
    try {
      const result = await db.query(
        'CALL sp_cancelar_tutoria(?)',
        [tutoria_id]
      );
      return result;
    } catch (error) {
      console.error('Error in cancelTutorial:', error);
      throw error;

    }
  }


}
module.exports = new TutorialsModel();