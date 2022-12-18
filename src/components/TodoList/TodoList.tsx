import React from "react";
import { useTodo } from "../../utils";
import { TodoPanel } from "../TodoPanel/TodoPanel";
//import styles from './TodoList.module.css'
import { TodoListItem } from "./TodoListItem/TodoListItem";



export const TodoList: React.FC = () => {
    const {todos, todoIdForEdit, closeTodo, deleteTodo, selectTodoForEdit} = useTodo()
    return (
        <div>
            {todos.map((todo) => {
                if(todo.id === todoIdForEdit){
                    return <TodoPanel mode='edit' key={todo.id} editTodo={{name:todo.name, description: todo.description}} />
                }
                return <TodoListItem key={todo.id} todo={todo} closeTodo={closeTodo} deleteTodo={deleteTodo} selectTodoForEdit={selectTodoForEdit}/>
            })}
        </div>
    )
}