import express from "express";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS
app.use(cors({ credentials: true, origin: true }))

// JSON body REQUEST
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

export default app;