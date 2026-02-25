import express from "express";
import cors from "cors";
import routerInit from "./routes/routerInit.route";
import { pool } from "./config/db.config";
import { createServer } from "node:http";
import { initSocket } from "./config/socket.config";
import cookieParser from "cookie-parser";
const app = express();
const port = 8080;

const server = createServer(app);

const corsOption = {
  origin: ["https://porfolio-rho-one.vercel.app"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
routerInit(app);

initSocket(server);

pool
  .query("SELECT NOW()")
  .then(() => console.log("Postgres connected"))
  .catch((err) => console.error("DB error:", err));

server.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
