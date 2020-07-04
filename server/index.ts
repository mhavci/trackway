import express from "express";
import path from "path";

const port = process.env.PORT || 3000;
const app: express.Application = express();

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res) => {
  res.send("trackway");
});

app.listen(port, () => {
  console.log("server started on port 3000");
});
