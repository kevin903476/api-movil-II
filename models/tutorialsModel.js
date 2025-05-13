//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class TutorialsModel {

  async getTutorials({
    limit,
    offset,
    keyword,
    clasificacion,
    modalidad,
    pais,
    carrera,
    universidad
  }) {
    try {
      // 1) Montar dinámicamente WHERE y sus parámetros
      const whereClauses = [];
      const params = [];

      if (keyword?.trim()) {
        const terms = keyword
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);

        terms.forEach(term => {
          whereClauses.push(`(
          curso    LIKE ?
          OR profesor LIKE ?
          OR horarios LIKE ?
        )`);
          const like = `%${term}%`;
          params.push(like, like, like);
        });
      }
      if (clasificacion) {
        whereClauses.push('clasificacion_curso = ?');
        params.push(clasificacion);
      }
      if (modalidad) {
        whereClauses.push('modalidad = ?');
        params.push(modalidad);
      }
      if (pais) {
        whereClauses.push('pais = ?');
        params.push(pais);
      }
      if (carrera) {
        whereClauses.push('carrera = ?');
        params.push(carrera);
      }
      if (universidad) {
        whereClauses.push('universidad = ?');
        params.push(universidad);
      }

      const whereSQL = whereClauses.length
        ? ' WHERE ' + whereClauses.join(' AND ')
        : '';

      // 2) Consulta de total
      const countSQL = `SELECT COUNT(*) AS total FROM vista_cursos_profesor${whereSQL}`;
      const [countRows] = await db.query(countSQL, params);
      const total = countRows[0].total;

      // 3) Consulta de datos paginados
      const dataSQL = `
      SELECT *
        FROM vista_cursos_profesor
        ${whereSQL}
      ORDER BY curso_profesor_id DESC
      LIMIT ? OFFSET ?
    `;
      const dataParams = [...params, limit, offset];
      const rows = await db.query(dataSQL, dataParams);
      return { rows, total };
    } catch (err) {
      console.error('Error en getTutorials:', err);
      throw err;
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