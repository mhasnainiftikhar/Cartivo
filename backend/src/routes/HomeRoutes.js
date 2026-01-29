import express from "express";
import homeController from "../controller/HomeController.js";
import authenticate from "../middleware/authenticate.js";

const homeRouter = express.Router();

homeRouter.get("/", homeController.getHomePageData);
homeRouter.post("/", authenticate, homeController.createHomeData);
homeRouter.patch("/:id", authenticate, homeController.updateHomeData);
homeRouter.delete("/:id", authenticate, homeController.deleteHomeData);

export default homeRouter;
