//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class TutorialsModel {

    async getTutorials() {
        try {
            const result = await db.query('SELECT * FROM vista_cursos_profesor');
            const cursos = result;
            console.log('Resultado de la consulta:', cursos);
            return cursos;
        } catch (error) {
            console.error('Error al obtener cursos_profesor disponibles:', error);
            throw error;
        }
    }

    async getScheduledTutorials() {
      try {
          const result = await db.query('SELECT * FROM vista_tutorias');
          const cursos = result;
          console.log('Resultado de la consulta:', cursos);
          return cursos;
      } catch (error) {
          console.error('Error al obtener cursos_profesor agendadas:', error);
          throw error;
      }
  }

    async scheduleTutoring(tutoria) {
        const { profesor_id, estudiante_id, curso_id, fecha, hora_inicio, hora_fin, temas} = tutoria;
        try {
          const result = await db.query(
            'CALL sp_agendar_tutoria(?, ?, ?, ?, ?, ?, ?)',
            [ profesor_id, estudiante_id, curso_id, fecha, hora_inicio, hora_fin, temas]
          );
          return result;
        } catch (error) {
          console.error('Error in createCourse:', error);
          throw error;
    
        }
      }


}
module.exports = new TutorialsModel();