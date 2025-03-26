import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
const UpdateTodo = ({
  showUpdate,
  setShowUpdate,
  selectedTodo,
  refreshTodos,
}) => {
  const [updatedTodo, setUpdatedTodo] = useState({
    title: selectedTodo.title,
    description: selectedTodo.description,
    completed: selectedTodo.completed,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setUpdatedTodo((prev) => ({
      ...prev,
      completed: e.target.checked, // Update completed status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${selectedTodo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = res.data;
      if (success) {
        setShowUpdate(false);
        toast.success(message);
        refreshTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" absolute top-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 h-full w-full ">
      <div className="w-full flex items-center h-full justify-center relative">
        <form
          className=" max-w-md w-full border-2 border-gray-400 bg-gray-300 p-5 rounded-lg flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-center">
            Update <span className="text-blue-500">Task </span>{" "}
          </h1>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter your Title"
              id="title"
              name="title"
              className="px-2 py-1 rounded-md border-2 border-gray-200 focus:outline-none focus:border-gray-400"
              value={updatedTodo.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="description">Description</label>
            <div className="relative">
              <textarea
                type="text"
                placeholder="Write a description..."
                id="description"
                name="description"
                className="px-2 py-1 rounded-md w-full min-h-[75px] resize-none border border-gray-200 focus:outline-none focus:border-gray-400"
                value={updatedTodo.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
              id="completed-checkbox"
              checked={updatedTodo.completed}
              onChange={handleCheckboxChange}
            />
            <label
              className="ms-2 text-sm font-medium text-gray-900 "
              htmlFor="completed-checkbox"
            >
              {updatedTodo.completed
                ? "Mark as Incomplete"
                : "Mark as Complete"}
            </label>
          </div>
          <button
            className="border-1 border-gray-600 bg-gray-700 px-3 py-2 rounded-lg text-white"
            type="submit"
          >
            Update Task
          </button>
        </form>
        <div className="absolute top-2.5 right-2.5">
          <MdCancel
            size={30}
            className="cursor-pointer"
            onClick={() => setShowUpdate(!showUpdate)}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
