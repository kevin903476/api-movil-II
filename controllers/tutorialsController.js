//@ts-check
const TutorialsService = require('../services/tutorialsService');
const NotificationService = require('../services/notificationsService');

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
    const { limit, offset } = req.pagination;
    const { keyword, clasificacion, modalidad, pais, carrera, universidad } = req.query;
    const result = await TutorialsService.getTutorials({ limit, offset, keyword, clasificacion, modalidad, pais, carrera, universidad });

    // Asegura que result.rows sea un array antes de usar map
    const tutoriasArray = Array.isArray(result.rows) ? result.rows : [];

    // Convertir los horarios de string a array en cada tutoría
    const tutoriasFormateadas = tutoriasArray.map(tutoria => {
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
      data: tutoriasFormateadas,
      total: result.total // <-- Aquí devuelves el total
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
  try {
    console.log('Lo que llega al scheduleTutoring:', req.body);
    const { profesor_id, curso_id, fecha, hora_inicio, hora_fin, temas } = req.body;

    // 1) Estudiante desde el JWT
    const estudiante = await UserService.getStudentByUserId(req.user.id);
    if (!estudiante?.estudiante_id) {
      return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
    }

    // 2) Crear tutoría
    const { mensaje, tutoria_id } = await TutorialsService.scheduleTutoring({
      profesor_id,
      estudiante_id: estudiante.estudiante_id,
      curso_id,
      fecha,
      hora_inicio,
      hora_fin,
      temas,
    });

    // 3) Obtener el usuario asociado al profesor
    const usuarioProfesorId = await UserService.getUserIdByProfesorId(profesor_id);
    if (!usuarioProfesorId) {
      console.warn(`No se encontró usuario para profesor_id=${profesor_id}`);
    } else {
      // 4) Enviar notificación
      const titulo = '🎓 Nueva tutoría agendada';
      const cuerpo = `El estudiante ${estudiante.nombre} ${estudiante.apellido} agendó una tutoría para el ${fecha} a las ${hora_inicio}.`;
      await NotificationService.sendNotificationToUser(
        usuarioProfesorId,
        titulo,
        cuerpo,
        { tutoria_id, curso_id }
      );
    }

    // 5) Responder al cliente
    return res.status(201).json({
      success: true,
      message: mensaje,
      data: { tutoria_id },
    });
  } catch (error) {
    console.error('Error al registrar tutoría:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al registrar tutoría',
    });
  }
};


const getPendingTutorialProfessor = async (req, res) => {
  try {

    const { profesor_id, curso_id, fecha } = req.body;


    const result = await TutorialsService.getPendingTutorialProfessor(profesor_id, curso_id, fecha);

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

    const { curso_id } = req.body;

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

const cancelTutorial = async (req, res) => {
  try {
    const { tutoria_id } = req.body;
    const tutoriaInfo = await TutorialsService.cancelTutorial(tutoria_id);
    if (tutoriaInfo.profesor_id) {
      const usuarioProfesorId = await UserService.getUserIdByProfesorId(tutoriaInfo.profesor_id);
      if (usuarioProfesorId) {
        const titulo = '❌ Tutoría cancelada';
        const cuerpo = `Tu tutoría del ${tutoriaInfo.fecha} a las ${tutoriaInfo.hora_inicio} ha sido cancelada.`;
        await NotificationService.sendNotificationToUser(
          usuarioProfesorId,
          titulo,
          cuerpo,
          { tutoria_id }
        );
      }
    }
    return res.status(200).json({
      success: true,
      message: 'Tutoría cancelada correctamente',
      data: tutoriaInfo
    });
  } catch (error) {
    console.error('Error al cancelar la tutoría:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al cancelar la tutoría'
    });
  }
}

const getPendingTutorialsProfessor = async (req, res) => {
  try {
    const profesor = await UserService.getProfesorByUserId(req.user.id);
    const profesor_id = profesor.profesor_id;

    if (!profesor_id) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    const result = await TutorialsService.getPendingTutorialsProfessor(profesor_id);

    return res.status(201).json({
      success: true,
      message: 'Tutorías pendientes del profesor obtenidos correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener tutorías pendientes del profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener tutorías pendientes del profesor'
    });
  }
}
module.exports = {
  getTutorials,
  scheduleTutoring,
  getScheduledTutorials,
  getTutorialsProfessorCourse,
  getPendingTutorialProfessor,
  cancelTutorial,
  getPendingTutorialsProfessor

}