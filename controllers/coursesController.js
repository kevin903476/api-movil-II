//@ts-check
const CoursesService = require('../services/coursesService');

const UserService = require('../services/userService');

const getCourses = async (req, res) => {
  try {
    const courses = await CoursesService.getCourses();
    console.log('Cursos obtenidos:', courses);
    return res.status(200).json({
      success: true,
      message: 'Cursos obtenidos correctamente',
      data: courses
    });
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener cursos'
    });
  }
}

const getCoursesProfessor = async (req, res) => {
  try {
 

    const profesor = await UserService.getProfesorByUserId(req.user.id);

    const profesor_id = profesor.profesor_id;

    if (!profesor_id) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    const courses = await CoursesService.getCoursesProfessor(profesor_id);
    console.log('Cursos_profesor obtenidos:', courses);

    return res.status(200).json({
      success: true,
      message: 'Cursos_profesor obtenidos correctamente',
      data: courses
    });
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    return res.status(500).json({
        success: false,
        message: 'Error al obtener cursos:',
        error: error.message
    });
  }
}

const createCourse = async (req, res) => {
  console.log("Datos recibidos del curso", req.body);
  try {

    const { universidad_id, carrera_id, clasificacion_id, nombre, descripcion } = req.body;

    const result = await CoursesService.createCourse({
      universidad_id,
      carrera_id,
      clasificacion_id,
      nombre,
      descripcion
    });

    return res.status(201).json({
      success: true,
      message: 'Curso registrado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al registrar curso:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar curso',
      error: error.message
    });
  }
};
const insertCourseScheduleProfessor = async (req, res) => {
  console.log("Datos recibidos del curso_profesor", req.body);
  try {

    const { curso_id, monto_por_hora, modalidad, horario } = req.body;

    const profesor = await UserService.getProfesorByUserId(req.user.id);
    const profesor_id = profesor.profesor_id;

    if (!profesor_id) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    const result = await CoursesService.insertCourseScheduleProfessor({
      profesor_id,
      curso_id,
      monto_por_hora,
      modalidad,
      horario
    });

    return res.status(201).json({
      success: true,
      message: 'Curso_profesor registrado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al registrar curso_profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar curso_profesor'
    });
  }
};

const searchCourses = async (req, res) => {
  try {
    // Obtener parámetros de la consulta
    const { keyword, clasificacion_id } = req.query;

    const courses = await CoursesService.searchCoursesByKeywordAndClassification(
      keyword || '',
      clasificacion_id ? parseInt(clasificacion_id) : null
    );

    return res.status(200).json({
      success: true,
      message: 'Cursos encontrados correctamente',
      data: courses
    });
  } catch (error) {
    console.error('Error al buscar cursos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar cursos',
      error: error.message
    });
  }
};

const logicalDeleteCourse = async (req, res) => {
  try {
    const { curso_id } = req.body;
    if (!curso_id) {
      return res.status(400).json({
        success: false,
        message: 'El ID del curso es requerido para eliminarlo.'
      });
    }
    const result = await CoursesService.logicalDeleteCourse(curso_id);
    return res.status(200).json({
      success: true,
      message: 'Curso eliminado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el curso',
      error: error.message
    });
  }
}


module.exports = {
  getCourses,
  createCourse,
  insertCourseScheduleProfessor,
  searchCourses,
  logicalDeleteCourse,
  getCoursesProfessor
}