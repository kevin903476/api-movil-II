//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class CoursesModel {
    async getCourses() {
        try {
            const result = await db.query('SELECT * FROM vista_cursos');
            const cursos = result;
            console.log('Resultado de la consulta:', cursos);
            return cursos;
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            throw error;
        }
    }

    async createCourse(curso) {
        const { universidad_id, carrera_id, clasificacion_id, nombre, descripcion} = curso;
        try {
          const result = await db.query(
            'CALL sp_insertar_curso(?, ?, ?, ?, ?)',
            [universidad_id, carrera_id,clasificacion_id, nombre, descripcion]
          );
          return result;
        } catch (error) {
          console.error('Error in createCourse:', error);
          throw error;
    
        }
      }
    async insertCourseScheduleProfessor(curso_profesor) {
        const { profesor_id, curso_id, monto_por_hora, modalidad, horario} = curso_profesor;
        try {
          const result = await db.query(
            'CALL sp_insertar_curso_horario_profesor(?, ?, ?, ?, ?)',
            [ profesor_id, curso_id, monto_por_hora, modalidad, horario]
          );
          return result;
        } catch (error) {
          console.error('Error in insertCourseScheduleProfessor:', error);
          throw error;
    
        }
      }


}
module.exports = new CoursesModel();