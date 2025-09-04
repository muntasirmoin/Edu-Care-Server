import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import expressSession from "express-session";

import "./app/config/passport";
import passport from "passport";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to EduCare Management System Backend",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;

//  .constant.ts
//  .controller.ts
//  .interface.ts
//  .model.ts
//  .route.ts
//  .service.ts
//  .validation.ts
