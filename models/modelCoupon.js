//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class CouponModel {
    async getAllCoupons() {
        try {
            const result = await db.query('SELECT * FROM vista_catalogo_cupones');
            const coupons = result;
            console.log('Resultado de la consulta:', coupons);
            return coupons;
        } catch (error) {
            console.error('Error al obtener cupones:', error);
            throw error;
        }
    }
    async getRanking() {
        try {
            const result = await db.query('SELECT * FROM vista_ranking');
            const coupons = result;
            console.log('Resultado de la consulta:', coupons);
            return coupons;
        } catch (error) {
            console.error('Error al obtener cupones:', error);
            throw error;
        }
    }
    async createCoupon(coupon) {
        try {
            const { nombre_cupon, descuento, fecha_inicio, fecha_expiracion, puntos_requeridos, codigo } = coupon;
            const result = await db.query('CALL sp_insertar_cupon_descuento(?, ?, ?, ?, ?,?)',
                [nombre_cupon, descuento, fecha_inicio, fecha_expiracion, puntos_requeridos, codigo]);
            console.log('Resultado de la creación del cupón:', result);
            return result;
        } catch (error) {
            console.error('Error al crear cupon:', error);
            throw error;
        }
    }
}

module.exports = new CouponModel();
