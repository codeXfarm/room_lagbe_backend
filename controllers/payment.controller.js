import { Payment } from "../models/payment.model.js";
import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";

export const getPayment = async (req, res) => {
  const { userId, flatId, sender, transitionId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    const flat = await Room.findById(flatId);

    if (!user || !flat) {
      return res
        .status(404)
        .json({ success: false, message: "User or Flat not found" });
    }
    if (!transitionId) {
      return res
        .status(400)
        .json({ success: false, message: "Transition ID is required" });
    }
    const payment = new Payment({
      user: userId,
      flat: flatId,
      sender,
      transitionId,
      amount,
    });
    await payment.save();
    return res
      .status(200)
      .json({ success: true, message: "payment created", payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    const payment = await Payment.find({}).populate("flat").populate({
      path: "user",
      select: "displayName email",
    });
    if (user.role === "user") {
      const finalPayments =
        payment.filter((p) => p.user.email === user.email) || [];
      return res.json({ success: true, finalPayments });
    } else if (user.role === "owner") {
      const finalPayments =
        payment.filter((p) => p.flat?.auth?.email === user.email) || [];
      return res.json({ success: true, finalPayments });
    } else if (user.role === "admin") {
      const finalPayments = await Payment.find({});
      return res.json({ success: true, finalPayments });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    return res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
