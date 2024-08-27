import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
})

app.listen(8000);

export default app;