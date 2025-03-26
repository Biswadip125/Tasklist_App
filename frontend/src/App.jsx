import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import toast from "react-hot-toast";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/todos");

      const { success, todos } = res.data;
      if (success) {
        setTodos(todos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/todos", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, todo, message } = res.data;
      if (success) {
        toast.success(message);
        setTodos((prevTodos) => [...prevTodos, todo]);
        setFormData({
          title: "",
          description: "",
          completed: false,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <div className=" h-screen max-w-[1280px] p-4 rounded-lg  mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>
        <form className="flex flex-col mb-4 gap-4" onSubmit={addTodo}>
          <div className="flex gap-2 items-center ">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title here"
              className="focus:outline-2 focus:outline-gray-300 border border-gray-200 p-2 w-full max-w-lg rounded-lg "
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder="Enter description here "
              className="max-w-md  min-h-[75px] rounded p-2 border border-gray-200 focus:outline-2 w-full focus:outline-gray-300 resize-none "
              cols={5}
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg w-52 font-semibold"
              onClick={addTodo}
            >
              Add Task
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4">
          {todos.map((todo, idx) => (
            <Todo
              key={todo.id}
              todo={todo}
              idx={idx + 1}
              showUpdate={showUpdate}
              setShowUpdate={setShowUpdate}
              setSelectedTodo={setSelectedTodo}
              refreshTodos={fetchTodos}
            />
          ))}
        </div>
      </div>
      {showUpdate && (
        <UpdateTodo
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          selectedTodo={selectedTodo}
          refreshTodos={fetchTodos}
        />
      )}
    </div>
  );
}

export default App;
