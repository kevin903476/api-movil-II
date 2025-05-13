//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class TutorialsModel {

  async getTutorials({ limit, offset, keyword, clasificacion, modalidad, pais, carrera, universidad }) {
  try {
    let sql = 'SELECT * FROM vista_cursos_profesor';
    const params = [];
    const where = [];

    // 1) Búsqueda por keyword en curso, profesor y horarios
    if (keyword?.trim()) {
      // dividimos por comas y eliminamos vacíos
      const terms = keyword
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // FULLTEXT requiere un boolean query por término
      const booleanQueries = terms.map(t => `+${t}`);

      // construimos una cláusula MATCH…AGAINST para curso y profesor
      where.push(`(
        MATCH(curso) AGAINST(? IN BOOLEAN MODE)
        OR MATCH(profesor) AGAINST(? IN BOOLEAN MODE)
        OR horarios LIKE ?
      )`);

      // un MATCH para cada campo, y un LIKE global para horarios
      // para FULLTEXT usamos la misma cadena booleanQueries.join(' ')
      const bq = booleanQueries.join(' ');
      params.push(bq, bq, `%${keyword}%`);
    }

    // 2) Filtros exactos
    if (clasificacion) {
      where.push('clasificacion_curso = ?');
      params.push(clasificacion);
    }
    if (modalidad) {
      where.push('modalidad = ?');
      params.push(modalidad);
    }
    if (pais) {
      where.push('pais = ?');
      params.push(pais);
    }
    if (carrera) {
      where.push('carrera = ?');
      params.push(carrera);
    }
    if (universidad) {
      where.push('universidad = ?');
      params.push(universidad);
    }

    // 3) Montamos WHERE, ORDER y paginación
    if (where.length) {
      sql += ' WHERE ' + where.join(' AND ');
    }
    sql += ' ORDER BY curso_profesor_id DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // 4) Ejecutamos
    const [rows] = await db.query(sql, params);
    return rows;
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