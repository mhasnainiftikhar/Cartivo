import express from "express";
import homeCategoryController from "../controller/HomeCategoryController.js";
import authenticate from "../middleware/authenticate.js";

const homeCategoryRouter = express.Router();

homeCategoryRouter.get("/", homeCategoryController.getAllHomeCategories);
homeCategoryRouter.post("/", authenticate, homeCategoryController.createHomeCategory);
homeCategoryRouter.patch("/:id", authenticate, homeCategoryController.updateHomeCategory);
homeCategoryRouter.delete("/:id", authenticate, homeCategoryController.deleteHomeCategory);

export default homeCategoryRouter;
