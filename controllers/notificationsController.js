const NotificationService = require('../services/notificationsService');
const registerPushToken = async (req, res) => {
  try {
    const usuario_id = req.user.id; 
    const {token, plataforma } = req.body;
    
    if (!usuario_id || !token || !plataforma) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos: usuario_id, token y plataforma son obligatorios'
      });
    }
    
    await NotificationService.saveUserToken(usuario_id, token, plataforma);
    
    return res.status(200).json({
      success: true,
      message: 'Token de notificación registrado correctamente'
    });
  } catch (error) {
    console.error('Error al registrar token:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar token de notificación'
    });
  }
};

const sendNotification = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { titulo, mensaje, datos } = req.body;
    
    if (!usuario_id || !titulo || !mensaje) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos: usuario_id, titulo y mensaje son obligatorios'
      });
    }
    
    const result = await NotificationService.sendNotificationToUser(
      usuario_id,
      titulo,
      mensaje,
      datos || {}
    );
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar notificación'
    });
  }
};

module.exports = {
  registerPushToken,
  sendNotification
};