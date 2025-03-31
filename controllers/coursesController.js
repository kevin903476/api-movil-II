//@ts-check
const CoursesService = require('../services/coursesService');

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

const createCourse = async (req, res) => {
    console.log("Datos recibidos del curso", req.body);
    try {
  
      const {  universidad_id, carrera_id, nombre, descripcion} = req.body;
  
      const result = await CoursesService.createCourse({
        universidad_id,
        carrera_id,
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
        message: 'Error al registrar curso'
      });
    }
  };
const insertCourseScheduleProfessor = async (req, res) => {
    console.log("Datos recibidos del curso_profesor", req.body);
    try {
  
      const { profesor_id, curso_id, monto_por_hora, modalidad, horario} = req.body;
  
      const result = await CoursesService.insertCourseScheduleProfessor({
        profesor_id, 
        curso_id, 
        monto_por_hora, 
        modalidad, 
        horario
        
        
      });
  
      return res.status(201).json({
        success: true,
        message: 'Curso registrado correctamente',
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

module.exports = {
    getCourses,
    createCourse,
    insertCourseScheduleProfessor
}