import express, { type Request, type Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
