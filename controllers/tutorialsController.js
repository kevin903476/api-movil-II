//@ts-check
const TutorialsService = require('../services/tutorialsService');

const UserService = require('../services/userService');

function parseHorariosToArray(horariosString) {
  if (!horariosString) return [];

  return horariosString.split(', ').map(horario => {
    const [dia, horas] = horario.split(' ');
    const [hora_inicio, hora_fin] = horas.split('-');

    return {
      dia,
      hora_inicio,
      hora_fin
    };
  });
}
const getTutorials = async (req, res) => {
  try {
    const tutorias = await TutorialsService.getTutorials();

    // Convertir los horarios de string a array en cada tutoría
    const tutoriasFormateadas = tutorias.map(tutoria => {
      if (tutoria.horarios) {
        tutoria.horarios_array = parseHorariosToArray(tutoria.horarios);
      } else {
        tutoria.horarios_array = [];
      }
      return tutoria;
    });

    return res.status(200).json({
      success: true,
      message: 'Tutorias del profesor obtenidos correctamente',
      data: tutoriasFormateadas
    });
  } catch (error) {
    console.error('Error al obtener Tutorias del profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener Tutorias del profesor'
    });
  }
}
const getScheduledTutorials = async (req, res) => {
  try {
    const estudiante = await UserService.getStudentByUserId(req.user.id);
    const estudiante_id = estudiante.estudiante_id;
    if (!estudiante_id) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }
    const tutorias = await TutorialsService.getScheduledTutorials(estudiante_id);
    console.log('Tutorias del profesor agendadas obtenidos:', tutorias);
    return res.status(200).json({
      success: true,
      message: 'Tutorias del profesor agendadas obtenidos correctamente',
      data: tutorias
    });
  } catch (error) {
    console.error('Error al obtener Tutorias del profesor agendadas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener Tutorias del profesor agendadas'
    });
  }
}

const scheduleTutoring = async (req, res) => {
  console.log("Datos recibidos del tutoria_profesor", req.body);
  try {

    const { profesor_id, curso_id, fecha, hora_inicio, hora_fin, temas } = req.body;

    const estudiante = await UserService.getStudentByUserId(req.user.id);
    const estudiante_id = estudiante.estudiante_id;

    if (!estudiante_id) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    const result = await TutorialsService.scheduleTutoring({
      profesor_id,
      estudiante_id,
      curso_id,
      fecha,
      hora_inicio,
      hora_fin,
      temas
    });

    return res.status(201).json({
      success: true,
      message: 'Tutoria_profesor registrado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al registrar tutoria_profesor:', error);
    return res.status(500).json({
      success: false,
      message: error.sqlMessage || error.message || 'Error al registrar tutoria_profesor'
    });
  }
  
};

const getPendingTutorialProfessor = async (req, res) => {
  try {

    const {profesor_id, curso_id} = req.body;
 

    const result = await TutorialsService.getPendingTutorialProfessor(profesor_id, curso_id);

    return res.status(201).json({
      success: true,
      message: 'Curso del profesor obtenidos correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener curso del profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener curso del profesor'
    });
  }
}
  const getTutorialsProfessorCourse = async (req, res) => {
    try {
  
      const {curso_id} = req.body;

      const profesor = await UserService.getProfesorByUserId(req.user.id);
        const profesor_id = profesor.profesor_id;

        if (!profesor_id) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }

      const result = await TutorialsService.getTutorialsProfessorCourse(profesor_id, curso_id);
  
      return res.status(201).json({
        success: true,
        message: 'Curso del profesor obtenidos correctamente',
        data: result
      });
    } catch (error) {
      console.error('Error al obtener curso del profesor:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener curso del profesor'
      });
    }
  }
module.exports = {
  getTutorials,
  scheduleTutoring,
  getScheduledTutorials,
  getTutorialsProfessorCourse,
  getPendingTutorialProfessor

}