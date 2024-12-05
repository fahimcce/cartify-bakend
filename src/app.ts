import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
// import router from "./app/routes";

const app: Application = express();
app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Library management system...");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
