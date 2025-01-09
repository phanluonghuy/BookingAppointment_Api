import express from "express";
import { dosageController } from "../controllers/dosageController";

const dosageRouter = express.Router();

dosageRouter.post("/", dosageController.createDosage);
dosageRouter.get("/:id", dosageController.getDosageById);
dosageRouter.get("/", dosageController.getAllDosages);
dosageRouter.patch("/:id", dosageController.updateDosage);
dosageRouter.delete("/:id", dosageController.deleteDosage);

export default dosageRouter;
