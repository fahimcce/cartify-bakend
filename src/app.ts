import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();
// app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cartify-murex.vercel.app"],
    credentials: true,
  })
);

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Cartify...");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
