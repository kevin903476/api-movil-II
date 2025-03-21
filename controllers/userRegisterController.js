const UserRegisterModel = require('../models/userRegister');
const bcryptjs = require('bcryptjs');

const registerUser = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password, rol_id, universidad_id, carrera_id } = req.body;
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const result = await UserRegisterModel.registerUser({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol_id,
      universidad_id,
      carrera_id
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: result
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario'
    });
  }
};

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


const loginUser = async (req, res) => {
 console.log("Prueba");
};


const getUserProfile = async (req, res) => {
 console.log("Prueba");
};

module.exports = { 
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers
};