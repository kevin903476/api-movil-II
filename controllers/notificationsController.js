const NotificationService = require('../services/notificationsService');

const registerPushToken = async (req, res) => {
  console.log('[Controller] registerPushToken invoked');
  console.log('[Controller] Request body:', req.body);
  const usuario_id = req.user.id;
  const { token, plataforma } = req.body;

  if (!usuario_id || !token || !plataforma) {
    console.warn('[Controller] Missing fields:', { usuario_id, token, plataforma });
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: usuario_id, token y plataforma son obligatorios'
    });
  }

  try {
    const result = await NotificationService.saveUserToken(
      usuario_id,
      token,
      plataforma
    );
    console.log('[Controller] saveUserToken result:', result);
    return res.status(200).json({ success: true, message: 'Token registrado' });
  } catch (error) {
    console.error('[Controller] Error registering token:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sendNotification = async (req, res) => {
  console.log('[Controller] sendNotification invoked');
  console.log('[Controller] Request body:', req.body);
  const usuario_id = req.user.id;
  const { titulo, mensaje, datos } = req.body;

  if (!usuario_id || !titulo || !mensaje) {
    console.warn('[Controller] Missing fields for sendNotification:', { usuario_id, titulo, mensaje });
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: usuario_id, titulo y mensaje son obligatorios'
    });
  }

  try {
    const result = await NotificationService.sendNotificationToUser(
      usuario_id,
      titulo,
      mensaje,
      datos || {}
    );
    console.log('[Controller] NotificationService returned:', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[Controller] Error sending notification:', error);
    return res.status(500).json({ success: false, message: 'Error al enviar notificación' });
  }
};

module.exports = {
  registerPushToken,
  sendNotification
};
