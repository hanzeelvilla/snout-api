import expess from "express";

const app = expess();

app.get("/", (req, res) => {
  res.send("Hola soy Snout 🐶");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
