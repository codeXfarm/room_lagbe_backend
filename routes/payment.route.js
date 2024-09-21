import express from "express";
import { deletePayment, getPayment, getPaymentById } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/transition", getPayment);
router.get("/payments/:userId", getPaymentById);
router.delete("/payments/delete/:paymentId", deletePayment);

export default router;
