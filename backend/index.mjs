import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDb from "./config/db.mjs"
import cors from 'cors';

import registerRoutes from "./routes/register.mjs";
import loginRoutes from "./routes/login.mjs";
import logoutRoutes from "./routes/logout.mjs";
import forgotRoutes from "./routes/Forgotpass.mjs";
import franchiseRoutes from "./routes/franchise.mjs"
import storeLocatorRoutes from "./routes/storelocator.mjs"
import carouselRoutes from "./routes/carousel.mjs"
import offersRoutes from "./routes/offers.mjs"
import menuRoutes from "./routes/menu.mjs"

dotenv.config();
await connectDb();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://jimmi-frontend.onrender.com",
  "https://jimmi-admin.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use("/api/register",registerRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/logout",logoutRoutes);
app.use("/api/forgot-pass", forgotRoutes);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/stores", storeLocatorRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


