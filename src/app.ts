import expess, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/index";

const app = expess();
app.use(expess.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hola soy el entry point de la API de snout 🐶");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
