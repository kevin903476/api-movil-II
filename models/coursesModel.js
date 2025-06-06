//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class CoursesModel {
    /* Esta consulta es optima si y solo si la bd es pequeña o mediana,
    ya que si la bd es grande, se recomienda hacer un WHERE ID > ? ORDER BY ID LIMIT ? OFFSET ?,
    ya que de lo contrario, la consulta se vuelve lenta y pesada. */
    async getCourses({ limit, offset, keyword, clasificacion_id }) {
        try {
            let query = 'SELECT * FROM vista_cursos WHERE estado = "activo"';
            const params = [];

            if (keyword && keyword.trim() !== '') {
                query += ' AND nombre_curso LIKE ?';
                params.push(`%${keyword}%`);
            }

            if (clasificacion_id) {
                query += ' AND clasificacion_id = ?';
                params.push(clasificacion_id);
            }

            query += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);

            const result = await db.query(query, params);
            console.log('Resultado de la consulta:', result);
            return result;
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
    async deleteCourseProfessor(profesor_id, curso_profesor_id) {
        try {
            const result = await db.query(
                'CALL sp_eliminar_curso_profesor(?, ?)',
                [profesor_id, curso_profesor_id]
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
    async deleteCourseAdmin(usuario_id, curso_id) {
        console.log("ID del usuario", usuario_id);
        try {
            const result = await db.query(
                'CALL sp_eliminar_curso_admin(?, ?)',
                [usuario_id, curso_id]
            );
            return result;
        } catch (error) {
            console.error('Error in deleteCourseAdmin:', error);
            throw error;
        }
    }
    async updateCourseAdmin(usuario_id, curso_id, nombre, descripcion) {
        try {
            const result = await db.query(
                'CALL sp_actualizar_curso_admin(?, ?, ?, ?)',
                [usuario_id, curso_id, nombre, descripcion]
            );
            return result;
        } catch (error) {
            console.error('Error in updateCourseAdmin:', error);
            throw error;
        }
    }

};

module.exports = new CoursesModel();