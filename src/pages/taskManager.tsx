import { useEffect, useMemo, useState } from "react";
import type { TodoResponse, Todo } from "../models/tasks-model";


export default function TaskManager() {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [taskEndPointUrl, setTaskEndPointUrl] = useState("https://dummyjson.com/todos?limit=10&skip=0");
    const [isAddTasksFormVisible, setIsAddTasksFormVisible] = useState(false);
    const [addTaskForm, setAddTaskForm] = useState<Todo>({
        id: 0,
        todo: "",
        completed: false,
        userId: 1,
        priority: "low"
    })

    const [searchTasks, setSearchTasks] = useState("")

    const [error, setError] = useState("");
    const [loadTasksIndicator, setLoadTasksIndicator] = useState(false)

    useEffect(() => {
        async function getTasks() {
            try {

                setLoadTasksIndicator(true);
                const response = await fetch(taskEndPointUrl);

                if (!response.ok) {
                    setError("Response not found");
                    throw new Error("Response not found");
                }

                const data: TodoResponse = await response.json();
                const todos: Todo[] = data.todos;
                todos.map(t => {
                    t.priority = "medium"
                })

                setTasks(todos)
            } catch (err) {
                setError("Something happened while getting tasks:" + err)
            } finally {
                setLoadTasksIndicator(false);
            }
        }

        getTasks();
    }, [])


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;

        setAddTaskForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    function onAddTaskSubmit(e: any) {
        e.preventDefault();

        if (!addTaskForm.todo.trim()) return;

        addTaskForm.id = tasks.length + 1;

        setTasks(prev => [
            ...prev,
            addTaskForm
        ])

        setAddTaskForm({
            id: 0,
            todo: "",
            completed: false,
            userId: 0,
            priority: "low"
        })

        setIsAddTasksFormVisible(false)

    }

    const filteredTasks: Todo[] = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.todo.toLowerCase().includes(searchTasks.toLowerCase());
            

            return matchesSearch
        })

    }, [tasks, searchTasks])

    return (<>

        {error}
        {loadTasksIndicator && (<p>loading tasks...</p>)}

        <input 
            type="text"
            name="searchTasks"
            value={searchTasks}
            onChange={(e)=>setSearchTasks(e.target.value)}
        />

        <button onClick={() => setIsAddTasksFormVisible(true)}>Add task</button>
        {filteredTasks.length !== 0 ? (<ul className="tasks-list">
            {filteredTasks.map(t => {
                return <li key={t.id}>
                    {t.todo} -
                    {t.completed ? "Completed" : "Not completed"} -
                    {t.priority},
                    {t.userId}
                </li>
            })}
        </ul>) : ("No tasks found")}


        {isAddTasksFormVisible && (
            <form onSubmit={onAddTaskSubmit}>
                <input
                    type="text"
                    name="todo"
                    value={addTaskForm.todo}
                    onChange={handleChange}
                />

                <label>
                    Completed:
                    <input
                        type="checkbox"
                        name="completed"
                        checked={addTaskForm.completed}
                        onChange={handleChange}
                    />

                    <select
                        name="priority"
                        value={addTaskForm.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button type="submit">Add Task</button>
                </label>
            </form>
        )}

    </>)
}