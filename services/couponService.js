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
}
module.exports = new CouponService();