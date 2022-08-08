import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:8000" }));

app.use(express.json());

console.log("Listening on port 3000");
app.listen(3000);
