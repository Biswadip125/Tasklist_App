# Tasklist App

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
    -   Response: An array of todo objects. Example:
        ```json
        [
          { "id": 1, "text": "Buy groceries", "completed": false },
          { "id": 2, "text": "Finish project", "completed": true }
        ]
        ```

    ➕ **Add a New Todo**

    -   `POST /todos`
    -   `Content-Type: application/json`
    -   Request Body:
        ```json
        { "text": "Your todo text" }
        ```
    -   Response: The newly created todo object. Example:
        ```json
        { "id": 3, "text": "Your todo text", "completed": false }
        ```

    ✏️ **Update a Todo**

    -   `PUT /todos/:id`
    -   `Content-Type: application/json`
    -   Request Body: (both or one of the fields are optional)
        ```json
        { "text": "Updated todo text", "completed": true/false }
        ```
    -   Response: The updated todo object. Example:
        ```json
        { "id": 1, "text": "Updated todo text", "completed": true }
        ```

    ❌ **Delete a Todo**

    -   `DELETE /todos/:id`
    -   Response: A success message or an empty response on successful deletion.

## 🔗 Technologies Used

-   Frontend: React, Tailwind CSS
-   Backend: Node.js, Express.js
-   Database: SQLite

## 📜 License

This project is licensed under the MIT License.
