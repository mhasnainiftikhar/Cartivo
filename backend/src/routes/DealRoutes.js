import express from "express";
import dealController from "../controller/DealController.js";
import authenticate from "../middleware/authenticate.js";

const dealRouter = express.Router();

dealRouter.get("/", dealController.getDeals);
dealRouter.post("/", authenticate, dealController.createDeal);
dealRouter.patch("/:id", authenticate, dealController.updateDeal);
dealRouter.delete("/:id", authenticate, dealController.deleteDeal);

export default dealRouter;
