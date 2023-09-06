import { fireEvent, render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

describe('Тестирование основного функционала', () => {
  it('adding todo', () => {
    render(<App />)
    const addBtn = screen.getByTestId('add_todo_button')
    const addNameInput = screen.getByTestId('add_todo_name')
    const addDescInput = screen.getByTestId('add_todo_desc')
    const todos = screen.getByTestId('todo_list')
    user.type(addNameInput, 'Name')
    user.type(addDescInput, 'Desc')
    user.click(addBtn)
    expect(addDescInput).toHaveValue('')
    expect(addNameInput).toHaveValue('')
    expect(todos.childNodes).toHaveLength(4) //With mocs
  })
  it('remove todo', () => {
    render(<App />)
    const todos = screen.getByTestId('todo_list')
    const len = todos.childNodes.length
    const deleteButtonsElement = screen.getAllByTestId('delete_todo_button')
    user.click(deleteButtonsElement[0])
    expect(todos.childNodes).toHaveLength(len - 1)
  })
  it('edit todo', () => {
    render(<App />)
    const todo = screen.getAllByTestId('todo_item')[0]
    let todoName = within(todo).getByTestId('todo_item_name').textContent
    let todoDesc = within(todo).getByTestId('todo_item_desc').textContent

    const editBtn = within(todo).getByTestId('edit_todo_button')
    user.click(editBtn)

    const editPanel = screen.getByTestId('todo_item_edit_panel')
    expect(editPanel).toBeInTheDocument()
    const editNameInput = within(editPanel).getByTestId('edit_todo_name')
    const editDescInput = within(editPanel).getByTestId('edit_todo_desc')

    expect(editNameInput).toBeInTheDocument()
    expect(editDescInput).toBeInTheDocument()
    expect(editDescInput).toHaveValue(todoDesc)
    expect(editNameInput).toHaveValue(todoName)

    todoName = 'test123'
    todoDesc = 'test321'

    fireEvent.change(editNameInput, {
      target: {
        value: todoName,
      },
    })
    fireEvent.change(editDescInput, {
      target: {
        value: todoDesc,
      },
    })

    const saveEditBtn = within(editPanel).getByTestId('edit_todo_button')
    user.click(saveEditBtn)
    expect(screen.getByText(todoName)).toBeInTheDocument()
    expect(screen.getByText(todoDesc)).toBeInTheDocument()
  })
})
