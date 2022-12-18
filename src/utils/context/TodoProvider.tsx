import React from "react";
import { TodoContext } from "./TodoContext";

interface TodoProviderProps{
    children: React.ReactNode
}


export const TodoProvider: React.FC<TodoProviderProps> = ({children}) => {
    
    const DEFAULT_TODO_LIST = [
        { id: 1, name: 'task 1', description: 'description 1', checked: false },
        { id: 2, name: 'task 2', description: 'description 2', checked: false },
        {
          id: 3,
          name: 'task 3',
          description:
            'they ask you how you are, and you just have to say you’re fine when you’re not really fine, but you just can’t get into it, because they would never understand',
          checked: true
        }
      ];

    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);
  
    const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
      console.log('add');
      if(todos.length > 0){
        setTodos([...todos, {id: todos[todos.length-1].id+1, description, name, checked: false}])
      } else{
        setTodos([{id: 1, description, name, checked: false}])
      }
    }
  
    const changeTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
      console.log('change');
      setTodos(todos.map(todo => {
        if(todo.id === todoIdForEdit){
          return {...todo, name: name, description: description }
        }
        return todo
      }))
      setTodoIdForEdit(null)
    }
    
    const selectTodoForEdit = (id: Todo['id']) => {
      setTodoIdForEdit(id);
    }
    const closeTodo = (id: Todo['id']) => {
      console.log('close');
      setTodos(todos.map(todo => {
        if(todo.id === id){
          return {...todo, checked: !todo.checked }
        }
        return todo
      }))
    }
    const deleteTodo = (id: Todo['id']) => {
      console.log('delete');
      
      setTodos(todos.filter((todo) => todo.id !== id))
    }
    const value = {
          
          todoIdForEdit,
          todos,
          deleteTodo,
          changeTodo,
          closeTodo,
          addTodo,
          selectTodoForEdit
        }
    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}