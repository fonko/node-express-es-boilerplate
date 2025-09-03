import express from 'express';
import paymentController from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/create-preference').post(paymentController.createPreference);

export default router;
