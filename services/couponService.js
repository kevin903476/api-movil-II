const CouponModel = require('../models/modelCoupon');

class CouponService {
    async getAllCoupons() {
        return await CouponModel.getAllCoupons();
    }
    async getRanking() {
        return await CouponModel.getRanking();
    }

    async createCoupon(coupon) {
        return await CouponModel.createCoupon(coupon);
    }
    async deleteCoupon(cupon_id) {
        if (!cupon_id) {
            throw new Error('El ID del cupón es requerido para eliminarlo.');
        }
        return await CouponModel.deleteCoupon(cupon_id);
    }
}
module.exports = new CouponService();