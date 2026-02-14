import express from "express";
import {sendResetCode,resetPassword} from "../Controller/Forgotpass.mjs";

const router = express.Router();

router.post("/send-code",sendResetCode);

router.post("/resetpassword",resetPassword);

export default router;