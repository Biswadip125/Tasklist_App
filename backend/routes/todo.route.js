import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todo.controller.js";

const router = express.Router();

router
  .get("/", getTodos)
  .post("/", createTodo)
  .put("/:id", updateTodo)
  .delete("/:id", deleteTodo);

export default router;
