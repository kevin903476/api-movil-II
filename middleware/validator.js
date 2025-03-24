const { body, validationResult } = require('express-validator');

exports.validateRegisterEstudiante = [
    body('nombre').isString().isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('apellido').isString().isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('email').isEmail().withMessage('Correo electrónico no válido'),
    body('password').isString().isLength({ min: 6, max: 50 }).withMessage('La contraseña debe tener entre 6 y 50 caracteres'),
    body('universidad_id').isInt().withMessage('Universidad ID debe ser un número entero'),
    body('pais_id').isInt().withMessage('País ID debe ser un número entero'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next(); 
    }
];
