import React from 'react'
import { Button } from '../../Button/Button'
import styles from './TodoListItem.module.css'
import { useTodo } from '../../../utils'

interface TodoListItemProps {
  todo: Todo
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const { closeTodo, deleteTodo, selectTodoForEdit } = useTodo()
  return (
    <div className={styles.todo_item_container} data-testid="todo_item">
      <div>
        <div
          aria-hidden
          data-testid="todo_item_name"
          style={{
            opacity: todo.checked ? 0.5 : 1,
            textDecoration: todo.checked ? 'line-through' : 'none',
          }}
          className={styles.todo_item_title}
          onClick={() => closeTodo(todo.id)}
        >
          {todo.name}
        </div>
        <div
          aria-hidden
          data-testid="todo_item_desc"
          style={{
            opacity: todo.checked ? 0.5 : 1,
            textDecoration: todo.checked ? 'line-through' : 'none',
          }}
          className={styles.todo_item_description}
        >
          {todo.description}
        </div>
      </div>
      <div className={styles.todo_item_button_container}>
        <Button color="black" onClick={() => selectTodoForEdit(todo.id)} data-testid="edit_todo_button">
          Edit
        </Button>
        <Button color="blue" onClick={() => deleteTodo(todo.id)} data-testid="delete_todo_button">
          Delete
        </Button>
      </div>
    </div>
  )
}
