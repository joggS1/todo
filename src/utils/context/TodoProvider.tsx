import React, { useCallback, useMemo } from 'react'
import { TodoContext } from './TodoContext'

interface TodoProviderProps {
  children: React.ReactNode
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const DEFAULT_TODO_LIST = [
    { id: 1, name: 'task 1', description: 'description 1', checked: false },
    { id: 2, name: 'task 2', description: 'description 2', checked: false },
    {
      id: 3,
      name: 'task 3',
      description:
        'they ask you how you are, and you just have to say you’re fine when you’re not really fine, but you just can’t get into it, because they would never understand',
      checked: true,
    },
  ]

  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST)
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(
    null
  )

  const addTodo = useCallback(
    ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
      if (name)
        setTodos((prev) => [
          ...prev,
          {
            id: prev.length ? prev[prev.length - 1].id + 1 : 1,
            description,
            name,
            checked: false,
          },
        ])
    },
    [setTodos]
  )

  const changeTodo = useCallback(
    ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === todoIdForEdit) {
            return { ...todo, name: name, description: description }
          }
          return todo
        })
      )
      setTodoIdForEdit(null)
    },
    [setTodos, setTodoIdForEdit, todoIdForEdit]
  )

  const selectTodoForEdit = useCallback((id: Todo['id']) => {
    setTodoIdForEdit(id)
  }, [])

  const closeTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked }
        }
        return todo
      })
    )
  }, [])

  const deleteTodo = useCallback(
    (id: Todo['id']) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    },
    [setTodos]
  )
  const value = useMemo(
    () => ({
      todoIdForEdit,
      todos,
      deleteTodo,
      changeTodo,
      closeTodo,
      addTodo,
      selectTodoForEdit,
    }),
    [
      todoIdForEdit,
      todos,
      deleteTodo,
      changeTodo,
      closeTodo,
      addTodo,
      selectTodoForEdit,
    ]
  )
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
