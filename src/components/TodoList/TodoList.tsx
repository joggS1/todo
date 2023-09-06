import React from 'react'
import { useTodo } from '../../utils'
import { TodoPanel } from '../TodoPanel/TodoPanel'
import { TodoListItem } from './TodoListItem/TodoListItem'

export const TodoList: React.FC = () => {
  const { todos, todoIdForEdit } = useTodo()
  return (
    <div data-testid="todo_list">
      {todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return (
            <div data-testid="todo_item_edit_panel" key={todo.id}>
              <TodoPanel
                mode="edit"
                editTodo={{ name: todo.name, description: todo.description }}
              />
            </div>
          )
        }
        return <TodoListItem key={todo.id} todo={todo} />
      })}
    </div>
  )
}
