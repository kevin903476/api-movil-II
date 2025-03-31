//@ts-check
const TutorialsService = require('../services/tutorialsService');

const UserService = require('../services/userService');

const getTutorials = async (req, res) => {
    try {
        const tutorias = await TutorialsService.getTutorials()
        console.log('Tutorias del profesor obtenidos:', tutorias);
        return res.status(200).json({
            success: true,
            message: 'Tutorias del profesor obtenidos correctamente',
            data: tutorias
        });
    } catch (error) {
        console.error('Error al obtener Tutorias del profesor:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener Tutorias del profesor'
        });
    }
}

const scheduleTutoring = async (req, res) => {
    console.log("Datos recibidos del tutoria_profesor", req.body);
    try {
  
      const { profesor_id, curso_id, fecha, hora_inicio, hora_fin, temas} = req.body;

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
        message: 'Error al registrar tutoria_profesor'
      });
    }
  };

module.exports = {
  getTutorials,
  scheduleTutoring
    
}