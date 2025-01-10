import express from "express";
import { medicineController } from "../controllers/medicineController";
import upload from "../middlewares/uploadMiddleware";

const medicineRouter = express.Router();

medicineRouter.post("/", upload.array("images", 5), medicineController.createMedicine);
medicineRouter.get("/:id", medicineController.getMedicineById);
medicineRouter.get("/", medicineController.getAllMedicines);
medicineRouter.patch("/:id", upload.array("images", 5), medicineController.updateMedicine);
medicineRouter.delete("/:id", medicineController.deleteMedicine);

export default medicineRouter;
