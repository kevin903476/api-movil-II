const { body } = require ('express-validator');

exports.validateRegisterEstudiante = [
    body('nombre').isString().isLength({ min: 2, max: 50 }),
    body('apellido').isString().isLength({ min: 2, max: 50 }),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6, max: 50 }),
    body('universidad_id').isInt(),
    body('pais_id').isInt()
];
