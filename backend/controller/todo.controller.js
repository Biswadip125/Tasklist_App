import { initializeDB } from "../database/db.js";

let db;

initializeDB().then((database) => {
  db = database;
});

export const getTodos = async (req, res) => {
  try {
    const todos = await db.all("SELECT * from todos");
    const formattedTodos = todos.map((todo) => ({
      ...todo,
      completed: Boolean(todo.completed),
    }));
    return res.json({
      success: true,
      todos: formattedTodos,
    });
  } catch (err) {
    return res.status(500).json({ sucess: false, message: err.message });
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    // Check if a todo with the same title already exists
    const existingTodo = await db.get("SELECT * FROM todos WHERE title = ?", [
      title,
    ]);

    if (existingTodo) {
      return res.status(409).json({
        success: false,
        message: "Todo with this title already exists",
      });
    }

    const result = await db.run(
      "INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)",
      [title, description, false]
    );
    if (result.changes === 1) {
      return res.status(201).json({
        success: true,
        message: "Todo added Successfully",
        todo: {
          id: result.lastID,
          title,
          description,
          completed: false,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (title) {
    const existingTodo = await db.get(
      "SELECT * FROM todos WHERE title = ? AND id != ?",
      [title, id]
    );

    if (existingTodo) {
      return res.status(400).json({
        success: false,
        message: "Todo with this title already exists",
      });
    }
  }
  try {
    const result = await db.run(
      "UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?",
      [title, description, completed ? 1 : 0, id]
    );

    if (result.changes === 1) {
      return res.json({ success: true, message: "Todo Update Successfully" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.run("DELETE FROM todos WHERE id = ?", [id]);
    if (result.changes === 1) {
      return res.json({ message: "Todo Deleted Successfully", success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
