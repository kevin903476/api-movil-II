const UserRegisterModel = require('../models/userRegister');
const bcryptjs = require('bcryptjs');

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
    const { nombre, apellido, email, password, universidad_id, pais_id, whatsapp} = req.body;


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
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await UserRegisterModel.findByEmail(email);

    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Comparar contraseña
    const isMatch = await bcryptjs.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        id: user[0].id,
        nombre: user[0].nombre,
        apellido: user[0].apellido,
        email: user[0].email,
        rol_id: user[0].rol_id
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  registerEstudiante,
  loginUser,
  getAllUsers,
  registerProfesor
};