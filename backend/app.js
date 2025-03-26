import express from "express";
import todoRoutes from "./routes/todo.route.js";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("server is running on PORT 3000");
});
