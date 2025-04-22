const CouponService = require('../services/couponService');

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await CouponService.getAllCoupons();
        return res.status(200).json({
            success: true,
            message: 'Cupones obtenidos correctamente',
            data: coupons
        });
    } catch (error) {
        console.error('Error retrieving coupons:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving coupons',
            error: error.message
        });
    }
}

const getRanking = async (req, res) => {
    try {
        const coupons = await CouponService.getRanking();
        return res.status(200).json({
            success: true,
            message: 'Ranking obtenido correctamente',
            data: coupons
        });
    } catch (error) {
        console.error('Error retrieving ranking:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving ranking',
            error: error.message
        });
    }
}
const createCoupon = async (req, res) => {
    try {
        const { nombre_cupon, descuento, fecha_inicio, fecha_expiracion, puntos_requeridos, codigo } = req.body;
        const coupon = {
            nombre_cupon,
            descuento,
            fecha_inicio,
            fecha_expiracion,
            puntos_requeridos,
            codigo  // Cambiado de 'cupon' a 'codigo' para coincidir con el modelo
        };
        const result = await CouponService.createCoupon(coupon);
        return res.status(201).json({
            success: true,
            message: 'Cupón creado correctamente',
            data: result
        });
    } catch (error) {
        console.error('Error creating coupon:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating coupon',
            error: error.message
        });
    }
}
const deleteCoupon = async (req, res) =>{
    try {
        const { cupon_id } = req.body;
        const result = await CouponService.deleteCoupon(cupon_id);
        return res.status(200).json({
            success: true,
            message: 'Cupón eliminado correctamente',
            data: result
        });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting coupon',
            error: error.message
        });
    }
}

module.exports = {
    getAllCoupons,
    createCoupon,
    getRanking,
    deleteCoupon
}