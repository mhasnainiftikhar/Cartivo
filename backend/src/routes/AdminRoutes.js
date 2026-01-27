import express from 'express'
import sellerController from '../controller/SellerController.js';

const adminRouter = express.Router();

adminRouter.patch('/seller/:id/status', sellerController.updateSellerAccountStatus);

export default adminRouter;