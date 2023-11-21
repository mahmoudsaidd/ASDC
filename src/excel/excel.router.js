import { Router } from "express";
import { HME, myMulter, validationType } from "../services/multer.js";
import * as excelController from "./excel.controller.js";

const router = Router();

router.post("/upload",myMulter(validationType.EXCEL).single("EXCEL"), HME, excelController.uploadExcel);

router.put("/update/:id", excelController.updateExcel);

router.delete("/delete/:id", excelController.deleteExcel);

export default router;
