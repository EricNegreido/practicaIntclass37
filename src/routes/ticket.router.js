import { Router } from "express";
import generateTicket from "../controllers/ticket.controller.js";

const router = Router()

router.post('/generateTicket', generateTicket);

export default router;