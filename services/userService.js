// @ts-check
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const UserRegisterModel = require('../models/userModel');
const sendMail = require('../utils/sendMail');

class UserService {
  // Solicita el reseteo de contraseña: genera token, lo hashea y lo guarda, luego envía email
  async requestPasswordReset(email) {
    const user = await UserRegisterModel.findByEmail(email);
    if (!user) return; // No revelar existencia

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 1000 * 60 * 30; // 30 minutos

    // Hasheamos el token antes de guardar
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await UserRegisterModel.savePasswordResetToken(user.usuario_id, tokenHash, expires);

    const resetUrl = `http://Frontend_de_los_Monos/reset-password?token=${token}`;
    await sendMail(
      user.email,
      'Restablecer contraseña',
      `Haga clic aquí para restablecer su contraseña: ${resetUrl}`
    );
  }

  // Ejecuta el reseteo de contraseña: valida token hasheado, actualiza password y limpia el token
  async resetPassword(token, newPassword) {
    // Hasheamos el token recibido para buscar coincidencia
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const record = await UserRegisterModel.findByResetToken(tokenHash);

    if (!record || record.expires < Date.now()) {
      throw new Error('Token inválido o expirado');
    }

    // Hasheamos la nueva contraseña y actualizamos
    const newHashed = await bcryptjs.hash(newPassword, 10);
    await UserRegisterModel.updatePassword(record.usuario_id, newHashed);
    await UserRegisterModel.deletePasswordResetToken(record.usuario_id);
  }

  async getAll() {
    return await UserRegisterModel.getAll();
  }

  async verifyExistingEmail(email) {
    return await UserRegisterModel.verifyExistingEmail(email);
  }

  async registerEstudiante(estudiante) {
    estudiante.password = await bcryptjs.hash(estudiante.password, 10);
    return await UserRegisterModel.registerEstudiante(estudiante);
  }

  async registerProfesor(profesor) {
    profesor.password = await bcryptjs.hash(profesor.password, 10);
    return await UserRegisterModel.registerProfesor(profesor);
  }

  async getProfileStudent(usuario_id) {
    return await UserRegisterModel.getProfileStudent(usuario_id);
  }

  async updateStudent(student) {
    return await UserRegisterModel.updateEstudiante(student);
  }

  async getProfileProfesor(usuario_id) {
    return await UserRegisterModel.getProfileProfesor(usuario_id);
  }

  async updateProfesor(profesor) {
    return await UserRegisterModel.updateProfesor(profesor);
  }

  async getStudentByUserId(usuario_id) {
    return await UserRegisterModel.getStudentByUserId(usuario_id);
  }

  async getProfesorByUserId(usuario_id) {
    return await UserRegisterModel.getProfesorByUserId(usuario_id);
  }

  async getProfilesProfesors() {
    return await UserRegisterModel.getProfilesProfesors();
  }
}

module.exports = new UserService();
