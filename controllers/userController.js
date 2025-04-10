const UserRegisterModel = require('../models/userModel');
const UserService = require('../services/userService');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const process = require('process');
dotenv.config();

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

const registerEstudiante = async (req, res) => {
  console.log("Datoss recibidos del estudiante", req.body);
  try {

    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id } = req.body;

    const result = await UserService.registerEstudiante({
      nombre,
      apellido,
      email,
      password,
      universidad_id,
      carrera_id,
      pais_id
    });

    return res.status(201).json({
      success: true,
      message: 'Estudiante registrado correctamente',
      data: result
    });
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
    const { nombre, apellido, email, password, universidad_id, carrera_id, pais_id, whatsapp } = req.body;


    const result = await UserService.registerProfesor({
      nombre,
      apellido,
      email,
      password,
      universidad_id,
      carrera_id,
      pais_id,
      whatsapp
    });

    return res.status(201).json({
      success: true,
      message: 'Profesor registrado correctamente',
      data: result
    });
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
    console.log('Body:', req.body);
    const { email, password } = req.body;

    const user = await UserRegisterModel.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    // Generar token JWT con datos adicionales
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
      { expiresIn: '24h' }
    );

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
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

const updateProfesor = async (req, res) => {
  try {
    const { usuario_id, whatsapp, foto, descripcion, nombre, apellido, universidad_id, sede_id, recinto_id, carrera_id } = req.body;

    const result = await UserService.updateProfesor({
      usuario_id,
      whatsapp,
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
      message: 'Error al actualizado estudiante'
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { nombre, apellido, carnet, universidad_id, sede_id, recinto_id, carrera_id } = req.body;
    const usuario_id = req.user.id;
    const result = await UserService.updateStudent({
     usuario_id,
      nombre,
      apellido,
      carnet,
      universidad_id,
      sede_id,
      recinto_id,
      carrera_id
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
      message: 'Error al actualizar estudiante'
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

module.exports = {
  registerEstudiante,
  loginUser,
  getAllUsers,
  registerProfesor,
  updateProfesor,
  updateStudent,
  getProfileStudent,
  getProfileProfesor,
};