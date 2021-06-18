import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

const PORT = 3002;

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!");
});

app.get("/bmi", (req, res) => {
  const info = req.query;

  if (!info.height || !info.weight) {
    res.status(400).json({ error: "please include height and weight" });
  } else if (isNaN(Number(info.height)) || isNaN(Number(info.weight))) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(Number(info.height), Number(info.weight));

    const result = {
      weight: Number(info.weight),
      height: Number(info.height),
      bmi: bmi,
    };
    res.json(result);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
