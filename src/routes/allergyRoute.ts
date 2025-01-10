import { Router } from "express";
import { allergyController } from "../controllers/allergyController";

const allergyRouter = Router();

allergyRouter.post("/", allergyController.createAllergy);
allergyRouter.get("/patient/:patientId", allergyController.getAllergiesByPatient);
allergyRouter.get("/:id", allergyController.getAllergyById);
allergyRouter.put("/:id", allergyController.updateAllergy);
allergyRouter.delete("/:id", allergyController.deleteAllergy);

export default allergyRouter;
