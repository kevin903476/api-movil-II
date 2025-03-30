const { Expo } = require('expo-server-sdk');
const PushTokenModel = require('../models/PushTokenModel');

class NotificationService {
  constructor() {
    this.expo = new Expo();
  }

  async saveUserToken(usuario_id, token, plataforma) {
    if (!Expo.isExpoPushToken(token)) {
      throw new Error('Token de notificación inválido');
    }
    return await PushTokenModel.saveToken(usuario_id, token, plataforma);
  }

  async sendNotificationToUser(usuario_id, titulo, mensaje, datos = {}) {
    try {
      // Obtener tokens del usuario
      const tokens = await PushTokenModel.getTokensByUserId(usuario_id);
      if (!tokens || tokens.length === 0) {
        return { success: false, message: 'No hay tokens registrados para este usuario' };
      }

      // Preparar mensajes
      let messages = [];
      for (let tokenObj of tokens) {
        const pushToken = tokenObj.token;
        
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Token inválido: ${pushToken}`);
          await PushTokenModel.deactivateToken(pushToken);
          continue;
        }
        
        messages.push({
          to: pushToken,
          sound: 'default',
          title: titulo,
          body: mensaje,
          data: { ...datos, usuario_id }
        });
      }

      if (messages.length === 0) {
        return { success: false, message: 'No hay tokens válidos para enviar notificaciones' };
      }

      // Enviar notificaciones
      let chunks = this.expo.chunkPushNotifications(messages);
      let tickets = [];
      
      for (let chunk of chunks) {
        try {
          let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error('Error al enviar notificaciones:', error);
        }
      }
      
      return { success: true, tickets };
    } catch (error) {
      console.error('Error en sendNotificationToUser:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();