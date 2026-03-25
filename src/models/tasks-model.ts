export type Priority = "low" | "medium" | "high"

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    priority?: Priority;
    userId: number
}

export interface TodoResponse{
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}
