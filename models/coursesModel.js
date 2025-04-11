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
    async getCoursesProfessor(profesor_id) {
        try {
            const result = await db.query('SELECT * FROM railway.vista_cursos_profesor WHERE profesor_id = ?', [profesor_id]);
            const cursos = result;
            console.log('Resultado de la consulta:', cursos);
            return cursos;
        } catch (error) {
            console.error('Error al obtener cursos_profesor disponibles:', error);
            throw error;
        }
    }

    async createCourse(curso) {
        const { universidad_id, carrera_id, clasificacion_id, nombre, descripcion } = curso;
        try {
            const result = await db.query(
                'CALL sp_insertar_curso(?, ?, ?, ?, ?)',
                [universidad_id, carrera_id, clasificacion_id, nombre, descripcion]
            );
            return result;
        } catch (error) {
            console.error('Error in createCourse:', error);
            throw error;

        }
    }
    async insertCourseScheduleProfessor(curso_profesor) {
        const { profesor_id, curso_id, monto_por_hora, modalidad, horario } = curso_profesor;
        try {
            const result = await db.query(
                'CALL sp_insertar_curso_horario_profesor(?, ?, ?, ?, ?)',
                [profesor_id, curso_id, monto_por_hora, modalidad, horario]
            );
            return result;
        } catch (error) {
            console.error('Error in insertCourseScheduleProfessor:', error);
            throw error;

        }
    }
    async searchCoursesByKeywordAndClassification(keyword, clasificacion_id) {
        try {
            let query = 'SELECT * FROM vista_cursos_filtrados WHERE 1=1';
            let params = [];

            if (keyword && keyword.trim() !== '') {
                query += ' AND nombre_curso LIKE ?';
                params.push(`%${keyword}%`);
            }

            if (clasificacion_id) {
                query += ' AND clasificacion_id = ?';
                params.push(clasificacion_id);
            }

            const result = await db.query(query, params);
            console.log('Resultado de la búsqueda de cursos:', result);
            return result;
        } catch (error) {
            console.error('Error al buscar cursos:', error);
            throw error;
        }
    }
    async logicalDeleteCourse(curso_id) {
        try {
            const result = await db.query(
                'CALL sp_borrado_logico_curso(?)',
                [curso_id]
            );
            return result;
        } catch (error) {
            console.error('Error in logicalDeleteCourse:', error);
            throw error;
        }
    }
    async deleteCourseProfessor(curso_profesor_id, profesor_id) {
        try {
            const result = await db.query(
                'CALL sp_eliminar_curso_profesor(?, ?)',
                [curso_profesor_id, profesor_id]
            );
            return result;
        } catch (error) {
            console.error('Error in deleteCourseProfessor:', error);
            throw error;
        }
    };

    async updateCourseProfessor(curso_profesor) {
        const { curso_profesor_id, profesor_id, monto_por_hora, modalidad, horario } = curso_profesor;
        try {
            const result = await db.query(
                'CALL sp_actualizar_curso_profesor(?, ?, ?, ?, ?)',
                [curso_profesor_id, profesor_id, monto_por_hora, modalidad, horario]
            );
            return result;
        } catch (error) {
            console.error('Error in updateCourseProfessor:', error);
            throw error;

        }
    };
    
};

module.exports = new CoursesModel();