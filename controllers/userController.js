const UserRegisterModel = require('../models/userModel');
const UserService = require('../services/userService');
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const process = require('process');
dotenv.config();

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El correo es requerido'
      });
    }
    await UserService.requestPasswordReset(email);
    return res.status(200).json({
      success: true,
      message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña'
    });
  } catch (error) {
    console.error('Error al solicitar reseteo de contraseña:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al solicitar reseteo de contraseña'
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token y nueva contraseña son requeridos'
      });
    }
    await UserService.resetPassword(token, newPassword);
    return res.status(200).json({
      success: true,
      message: 'Contraseña restablecida correctamente'
    });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al restablecer la contraseña'
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAll();
    console.log('Usuarios obtenidos:', users);
    return res.status(200).json({
      success: true,
      message: 'Usuarios obtenidos correctamente',
      data: users
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios'
    });
  }
};

const verifyExistingEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "email" es requerido'
      });
    }

    const mensaje = await UserService.verifyExistingEmail(email);

    if (mensaje.includes('disponible')) {
      return res.status(200).json({
        success: true,
        disponible: true,
        message: mensaje
      });
    } else {
      return res.status(200).json({
        success: true,
        disponible: false,
        message: mensaje
      });
    }

  } catch (error) {
    console.error('Error al verificar email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar el correo',
      error: error.message
    });
  }
};


const registerEstudiante = async (req, res) => {
  console.log("Datos recibidos del estudiante", req.body);
  try {
    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id, telefono} = req.body;

    const result = await UserService.registerEstudiante({
      nombre,
      apellido,
      email,
      password,
      universidad_id,
      carrera_id,
      pais_id,
      telefono
    });

    // Extraer el mensaje desde el resultado del procedimiento
    const mensaje = result[0]?.[0]?.mensaje;

    if (mensaje.includes('insertado correctamente')) {
      return res.status(200).json({
        success: true,
        message: mensaje,
        data: result
      });
    } else {
      return res.status(400).json({
        success: false,
        message: mensaje
      });
    }
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar estudiante',
      error: error.message
    });
  }
};

const registerProfesor = async (req, res) => {
  try {
    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id, telefono } = req.body;

    const result = await UserService.registerProfesor({
      nombre,
      apellido,
      email,
      password,
      universidad_id,
      carrera_id,
      pais_id,
      telefono
    });

    // El procedimiento devuelve algo como: [[{ mensaje: "..." }], metadata]
    const mensaje = result[0]?.[0]?.mensaje;

    if (mensaje.includes('insertado correctamente')) {
      return res.status(200).json({
        success: true,
        message: mensaje,
        data: result
      });
    } else {
      // Si no es éxito, consideramos que es un error lógico (pero no técnico)
      return res.status(400).json({
        success: false,
        message: mensaje
      });
    }
  } catch (error) {
    console.error('Error al registrar profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar profesor',
      error: error.message
    });
  }
};


const loginUser = async (req, res) => {
  try {
    console.time('Login - Total');

    const { email, password } = req.body;
    console.log('Body:', req.body);

    console.time('Login - Buscar usuario');
    const user = await UserRegisterModel.findByEmail(email);
    console.timeEnd('Login - Buscar usuario');

    if (!user) {
      console.timeEnd('Login - Total');
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    console.time('Login - Comparar contraseña');
    const isMatch = await bcryptjs.compare(password, user.password); // usa bcrypt (nativo)
    console.timeEnd('Login - Comparar contraseña');

    if (!isMatch) {
      console.timeEnd('Login - Total');
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    console.time('Login - Enviar correo');
    void UserService.findByEmail(email); // no bloquea, pero lo marcamos igual
    console.timeEnd('Login - Enviar correo');

    console.time('Login - Generar token');
    const token = jwt.sign(
      {
        id: user.usuario_id,
        email: user.email,
        rol_id: user.rol_id,
        universidad_id: user.universidad_id || null,
        sede_id: user.sede_id || null,
        recinto_id: user.recinto_id || null,
        carrera_id: user.carrera_id || null
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    console.timeEnd('Login - Generar token');

    console.timeEnd('Login - Total');

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        id: user.usuario_id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol_id: user.rol_id,
        universidad_id: user.universidad_id || null,
        sede_id: user.sede_id || null,
        recinto_id: user.recinto_id || null,
        carrera_id: user.carrera_id || null
      },
      token: token
    });
  } catch (error) {
    console.error('Error en login:', error);
    console.timeEnd('Login - Total');
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};


const updateProfesor = async (req, res) => {
  try {
    let foto = null;
    // ver qué manda el front:
    console.log('req.file', req.file);
    console.log('req.body', req.body);

    if (req.file && req.file.path) {
      foto = req.file.path; // Actualiza la ruta de la foto si se ha subido una nueva
    }
    const usuario_id = req.user.id;
    const { telefono, descripcion, nombre, apellido, universidad_id, sede_id, recinto_id, carrera_id } = req.body;

    const result = await UserService.updateProfesor({
      usuario_id,
      telefono,
      foto,
      descripcion,
      nombre,
      apellido,
      universidad_id,
      sede_id,
      recinto_id,
      carrera_id
    });

    return res.status(201).json({
      success: true,
      message: 'Profesor actualizado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al actualizado profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar profesor',
      error: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { nombre, apellido, carnet, universidad_id, sede_id, recinto_id, carrera_id, telefono } = req.body;
    const usuario_id = req.user.id;
    const result = await UserService.updateStudent({
      usuario_id,
      nombre,
      apellido,
      carnet,
      universidad_id,
      sede_id,
      recinto_id,
      carrera_id,
      telefono
    });
    return res.status(201).json({
      success: true,
      message: 'Estudiante actualizado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
const getProfileStudent = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const result = await UserService.getProfileStudent(usuario_id);
    console.log('Perfil de estudiante obtenido:', result);
    return res.status(200).json({
      success: true,
      message: 'Perfil de estudiante obtenido correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener el perfil del estudiante:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el perfil del estudiante'
    });
  }
};
const getProfilesProfesors = async (req, res) => {
  try {
    const users = await UserService.getProfilesProfesors();
    console.log('Perfiles obtenidos:', users);
    return res.status(200).json({
      success: true,
      message: 'Perfiles obtenidos correctamente',
      data: users
    });
  } catch (error) {
    console.error('Error al obtener los perfiles:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los perfiles'
    });
  }
};


const getProfileProfesor = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const result = await UserService.getProfileProfesor(usuario_id);
    console.log('Perfil de profesor obtenido:', result);
    return res.status(200).json({
      success: true,
      message: 'Perfil de profesor obtenido correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener el perfil del profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el perfil del profesor'
    });
  }
}
const getProfileProfesor_pv = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    const result = await UserService.getProfileProfesor(usuario_id);
    console.log('Perfil de profesor obtenido:', result);
    return res.status(200).json({
      success: true,
      message: 'Perfil de profesor obtenido correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener el perfil del profesor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el perfil del profesor'
    });
  }
}

module.exports = {
  registerEstudiante,
  loginUser,
  getAllUsers,
  registerProfesor,
  updateProfesor,
  updateStudent,
  getProfileStudent,
  getProfileProfesor,
  verifyExistingEmail,
  getProfilesProfesors,
  getProfileProfesor_pv,
  requestPasswordReset,
  resetPassword
};