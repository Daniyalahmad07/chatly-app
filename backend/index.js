import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

/* ======= CORS (FINAL, SIMPLE, WORKING) ======= */
app.use(cors({
  origin: "https://chatly-frontend-8g01.onrender.com",
  credentials: true
}));

// handle preflight
app.options("*", cors());

/* ======= MIDDLEWARE ======= */
app.use(express.json());
app.use(cookieParser());

/* ======= ROUTES ======= */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

/* ======= START ======= */
connectDb();

server.listen(port, () => {
  console.log("server started");
});
