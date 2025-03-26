# Todo App

This is a simple Todo application with a React frontend and a Node.js + Express + SQLite backend.

## 📌 Features

- Add, update, and delete todos
- Mark todos as completed
- Persistent storage using SQLite database

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## 📦 Installation

1.  **Clone the repository**

    ```sh
    git clone [https://github.com/Biswadip125/Tasklist_App](https://github.com/Biswadip125/Tasklist_App)
    cd Tasklist_App
    ```

2.  **Install Backend Dependencies**

    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**

    ```sh
    cd frontend
    npm install
    ```

4.  ▶️ **Running the Server**

    **Start the backend server**

    ```sh
    npm start
    ```

    **Start the frontend server**

    ```sh
    npm run dev
    ```

5.  **🛠 API Routes**

    ✅ **Get All Todos**

    -   `GET /todos`

    ➕ **Add a New Todo**

    -   `POST /todos`
    -   `Content-Type: application/json`

    ✏️ **Update a Todo**

    -   `PUT /todos/:id`
    -   `Content-Type: application/json`

    ❌ **Delete a Todo**

    -   `DELETE /todos/:id`
