const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class PushTokenModel {
  /**
   * Guarda o reactiva un token de push para un usuario, 
   * asegurando que sea el único activo.
   */
  async saveToken(usuario_id, token, plataforma) {
    try {
      // 1) Desactivar todos los tokens anteriores de este usuario
      await db.query(
        'UPDATE push_tokens SET activo = 0, updated_at = NOW() WHERE usuario_id = ?',
        [usuario_id]
      );

      // 2) Insertar o reactivar el token actual (UPSERT)
      await db.query(
        `INSERT INTO push_tokens
           (usuario_id, token, plataforma, activo, created_at, updated_at)
         VALUES (?, ?, ?, 1, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
           activo     = 1,
           plataforma = VALUES(plataforma),
           updated_at = NOW();`,
        [usuario_id, token, plataforma]
      );

      return { upserted: true };
    } catch (error) {
      console.error('Error al guardar token:', error);
      throw error;
    }
  }

  /**
   * Recupera todos los tokens activos de un usuario.
   */
  async getTokensByUserId(usuario_id) {
    try {
      const tokens = await db.query(
        'SELECT token FROM push_tokens WHERE usuario_id = ? AND activo = 1',
        [usuario_id]
      );
      return tokens.map(row => row.token);
    } catch (error) {
      console.error('Error al obtener tokens:', error);
      throw error;
    }
  }

  /**
   * Desactiva un token específico.
   */
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
