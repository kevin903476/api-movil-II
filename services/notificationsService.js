const { Expo } = require('expo-server-sdk');
const PushTokenModel = require('../models/PushTokenModel');

class NotificationService {
  constructor() {
    this.expo = new Expo();
  }

  async saveUserToken(usuario_id, token, plataforma) {
    console.log('[NotificationService] saveUserToken called with:', { usuario_id, token, plataforma });
    if (!Expo.isExpoPushToken(token)) {
      console.error('[NotificationService] Invalid Expo push token:', token);
      throw new Error('Token de notificación inválido');
    }
    const result = await PushTokenModel.saveToken(usuario_id, token, plataforma);
    console.log('[NotificationService] saveUserToken result:', result);
    return result;
  }

  async sendNotificationToUser(usuario_id, titulo, mensaje, datos = {}) {
    console.log('[NotificationService] sendNotificationToUser called with:', { usuario_id, titulo, mensaje, datos });
    try {
      // Obtener tokens y loguear
      const tokens = await PushTokenModel.getTokensByUserId(usuario_id);
      console.log('[NotificationService] Retrieved tokens:', tokens);
      if (!tokens || tokens.length === 0) {
        console.warn('[NotificationService] No tokens registered for user:', usuario_id);
        return { success: false, message: 'No hay tokens registrados para este usuario' };
      }

      // Preparar mensajes paso a paso
      let messages = [];
      for (let pushToken of tokens) {
        console.log('[NotificationService] Processing token:', pushToken);
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error('[NotificationService] Invalid push token, deactivating:', pushToken);
          await PushTokenModel.deactivateToken(pushToken);
          continue;
        }
        const msg = {
          to: pushToken,
          sound: 'default',
          title: titulo,
          body: mensaje,
          data: { ...datos, usuario_id }
        };
        console.log('[NotificationService] Prepared message:', msg);
        messages.push(msg);
      }

      if (messages.length === 0) {
        console.warn('[NotificationService] No valid messages to send');
        return { success: false, message: 'No hay tokens válidos para enviar notificaciones' };
      }

      // Dividir en chunks y loguear detalles
      const chunks = this.expo.chunkPushNotifications(messages);
      console.log('[NotificationService] Chunked into', chunks.length, 'chunks');
      let tickets = [];

      for (let [index, chunk] of chunks.entries()) {
        console.log(
          `[NotificationService] Sending chunk #${index + 1} with ${chunk.length} messages`);
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          console.log(`[NotificationService] Received tickets for chunk #${index + 1}:`, ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(
            `[NotificationService] Error sending chunk #${index + 1}:`,
            error
          );
        }
      }

      console.log('[NotificationService] All tickets:', tickets);
      return { success: true, tickets };
    } catch (error) {
      console.error('[NotificationService] sendNotificationToUser error:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();