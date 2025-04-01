//@ts-check
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const CouponController = require('../controllers/couponController');
const express = require('express');
const router = express.Router();

router.get('/getCoupons', auth, checkRole([1, 3]), CouponController.getAllCoupons);
router.get('/getRanking', auth, checkRole([1, 3]), CouponController.getRanking);
router.post('/createCoupon', auth, checkRole([1, 3]), CouponController.createCoupon);

module.exports = router;