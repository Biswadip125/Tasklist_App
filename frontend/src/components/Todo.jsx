import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
const Todo = ({
  todo,
  idx,
  showUpdate,
  setShowUpdate,
  setSelectedTodo,
  refreshTodos,
}) => {
  const deleteTodo = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/todos/${todo.id}`);

      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        refreshTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-200 w-full rounded-lg shadow-lg px-3 py-3 space-y-3 transition-all duration-300 hover:shadow-xl hover:bg-gray-300 hover:cursor-pointer">
      <div className="flex justify-between ">
        <h1 className="text-xl text-gray-900 font-bold">
          {idx}. {todo.title}
        </h1>
        <div
          className={`${
            todo.completed ? "bg-green-500 " : "bg-red-500"
          } px-2 py-1 text-sm rounded-lg text-center text-white shadow-md font-semibold`}
        >
          {todo.completed ? "Completed" : "Incomplete"}
        </div>
      </div>

      <div className="flex justify-between md:gap-0 gap-2">
        <p className="text-base text-gray-900 font-normal max-w-4xl lg:max-w-5xl break-words ">
          {todo.description}
        </p>
        <div className="flex items-center gap-2 ">
          <FaRegEdit
            size={17}
            className="cursor-pointer"
            onClick={() => {
              setShowUpdate(!showUpdate);
              setSelectedTodo(todo);
            }}
          />
          <AiOutlineDelete
            size={17}
            color="red"
            className="cursor-pointer"
            onClick={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
