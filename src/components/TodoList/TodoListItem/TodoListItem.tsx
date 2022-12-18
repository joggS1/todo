import React from "react";
import { Button } from "../../Button/Button";
import styles from './TodoListItem.module.css'

interface TodoListItemProps{
    todo: Todo;
    closeTodo: (id: Todo['id']) => void;    
    deleteTodo: (id: Todo['id']) => void;
    selectTodoForEdit: (id: Todo['id']) => void;
}

export const TodoListItem:React.FC<TodoListItemProps> = ({todo, closeTodo, deleteTodo, selectTodoForEdit}) => {
    return (
    <div className={styles.todo_item_container}>
        <div>
            <div aria-hidden 
                 style={{
                 opacity: todo.checked ? 0.5 : 1,
                 textDecoration: todo.checked ? 'line-through' : 'none' 
                 }} 
                 className={styles.todo_item_title}
                 onClick={() => closeTodo(todo.id)}
                 >
                {todo.name}
            </div>
            <div 
            aria-hidden 
            style={{
                opacity: todo.checked ? 0.5 : 1,
                textDecoration: todo.checked ? 'line-through' : 'none' 
            }} 
            className={styles.todo_item_description}>
                {todo.description}
            </div>
        </div>
        <div className={styles.todo_item_button_container}>
            <Button color="black" onClick={ () => selectTodoForEdit(todo.id) }>
                Edit
            </Button>
            <Button color="blue" onClick={() => deleteTodo(todo.id)}>
                Delete
            </Button>
        </div>
    </div>
    )
}