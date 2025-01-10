import { Router } from "express";
import { specializationController } from "../controllers/specializationController";

const specializationRouter = Router();

specializationRouter.post("/", specializationController.createSpecialization);
specializationRouter.get("/doctor/:doctorId", specializationController.getSpecializationsByDoctor);
specializationRouter.get("/:id", specializationController.getSpecializationById);
specializationRouter.put("/:id", specializationController.updateSpecialization);
specializationRouter.delete("/:id", specializationController.deleteSpecialization);
specializationRouter.delete("/:specializationId/qualification/:qualificationId", specializationController.deleteQualification);

export default specializationRouter;
