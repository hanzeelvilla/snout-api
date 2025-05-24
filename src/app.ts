import expess, { Request, Response } from "express";

const app = expess();

app.get("/", (req: Request, res: Response) => {
  res.send("Hola soy el entry point de la API de snout 🐶");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
