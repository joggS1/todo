import React from "react";

export interface TodoContextProps{
    todos: Todo[];
    todoIdForEdit: Todo['id'] | null;
    closeTodo: (id: Todo['id']) => void;
    deleteTodo: (id:Todo['id']) => void;
    selectTodoForEdit: (id:Todo['id']) => void;
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    todoIdForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    closeTodo: () => {},
    changeTodo: () => {},
    selectTodoForEdit: () => {}
})