const UserRegisterModel = require('../models/userRegister');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRegisterModel.getAll();
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
  try {
    const { nombre, apellido, email, password, universidad_id, pais_id } = req.body;


    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await UserRegisterModel.registerEstudiante({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      universidad_id,
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
      message: 'Error al registrar estudiante'
    });
  }
};
const registerProfesor = async (req, res) => {
  try {
    const { nombre, apellido, email, password, universidad_id, pais_id, whatsapp } = req.body;


    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await UserRegisterModel.registerProfesor({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      universidad_id,
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
      message: 'Error al registrar estudiante'
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log('Body:', req.body);
    const { email, password } = req.body;

    const user = await UserRegisterModel.findByEmail(email);

    console.log('Usuario encontrado:', user);
    console.log('Rol del usuario:', user.rol_id);

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

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.usuario_id,
        email: user.email,
        rol_id: user.rol_id
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
        rol_id: user.rol_id
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
    const { usuario_id, carrera_id, whatsapp, foto, descripcion } = req.body;

    const result = await UserRegisterModel.updateProfesor({
      usuario_id,
      carrera_id,
      whatsapp,
      foto,
      descripcion
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
    const { usuario_id, carnet, carrera_id } = req.body;
    const result = await UserRegisterModel.updateEstudiante({
      usuario_id,
      carnet,
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

module.exports = {
  registerEstudiante,
  loginUser,
  getAllUsers,
  registerProfesor,
  updateProfesor,
  updateStudent
};