import { useState } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
    const [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), done: false }]);
    const [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim() !== "") {
            setTodos((prevTodos) => [...prevTodos, { task: newTodo, id: uuidv4(), done: false }]);
            setNewTodo("");
        }
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    let markTaskDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    let markAllAsDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({ ...todo, done: true }))
        );
    };

    return (
        <div className="todo-wrapper">
            {/* ✅ GIF added here */}
            <img src="https://res.cloudinary.com/dx7ylrage/image/upload/v1740327026/todo_oln2h0.gif" 
                 alt="To-Do Animation" 
                 className="todo-gif" />
            
            <div className="todo-container">
                <input
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateTodoValue}
                />
                <br /><br />
                <button onClick={addNewTask}>Add Task</button>
                &nbsp;&nbsp;<button onClick={markAllAsDone}>Mark All as Done</button>
                <hr />
                <h4>Tasks Todo</h4>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <span className={todo.done ? "completed-task" : ""}>
                                {todo.done ? `✅ ${todo.task}` : todo.task}
                            </span>
                            &nbsp;&nbsp;<button className="done-btn" onClick={() => markTaskDone(todo.id)}>
                                ✔ Mark as Done
                            </button>
                            &nbsp;&nbsp;<button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                                ❌ Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
