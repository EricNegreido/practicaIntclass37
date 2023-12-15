import { Router } from "express";
import sendMail  from "../controllers/mailer.controller.js";

const router = Router();
router.post('/', sendMail);
export default router