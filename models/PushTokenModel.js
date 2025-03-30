const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PushTokenModel {
  async saveToken(usuario_id, token, plataforma) {
    try {
      // Primero verificar si ya existe un token para este usuario/dispositivo
      const existingTokens = await db.query(
        'SELECT * FROM push_tokens WHERE usuario_id = ? AND token = ?',
        [usuario_id, token]
      );
      
      if (existingTokens.length > 0) {
        // Actualizar token existente
        await db.query(
          'UPDATE push_tokens SET activo = 1, updated_at = NOW() WHERE usuario_id = ? AND token = ?',
          [usuario_id, token]
        );
        return { updated: true };
      } else {
        // Insertar nuevo token
        await db.query(
          'INSERT INTO push_tokens (usuario_id, token, plataforma, activo, created_at) VALUES (?, ?, ?, 1, NOW())',
          [usuario_id, token, plataforma]
        );
        return { inserted: true };
      }
    } catch (error) {
      console.error('Error al guardar token:', error);
      throw error;
    }
  }

  async getTokensByUserId(usuario_id) {
    try {
      const tokens = await db.query(
        'SELECT token FROM push_tokens WHERE usuario_id = ? AND activo = 1',
        [usuario_id]
      );
      return tokens;
    } catch (error) {
      console.error('Error al obtener tokens:', error);
      throw error;
    }
  }

  async deactivateToken(token) {
    try {
      await db.query(
        'UPDATE push_tokens SET activo = 0, updated_at = NOW() WHERE token = ?',
        [token]
      );
    } catch (error) {
      console.error('Error al desactivar token:', error);
      throw error;
    }
  }
}

module.exports = new PushTokenModel();