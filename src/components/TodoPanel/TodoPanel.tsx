import React from "react";
import { useTodo } from "../../utils";
import { Button } from "../Button/Button";
import styles from './TodoPanel.module.css'

const DEFAULT_TODO = {
    name: '',
    description: ''
}

interface AddTodoPanelProps{
    mode: 'add';
}
interface EditTodoPanelProps{
    mode: 'edit';
    editTodo: Omit<Todo, 'checked' | 'id'>;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel:React.FC<TodoPanelProps> = (props) => {
    const isEdit = props.mode === 'edit';
    const {changeTodo, addTodo} = useTodo();
    const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO) 

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setTodo({...todo, [name]:value})
    }

    const onClick = () =>{
        if(isEdit){
            return changeTodo({name: todo.name, description: todo.description})
        }
        addTodo({name: todo.name, description: todo.description})
        setTodo(DEFAULT_TODO)
    }
    return(
        <div className={styles.todo_panel_container}>
            <div className={styles.fields_container}>
                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Todo Name</div>
                        <input type="text" placeholder="Learn React" value={todo.name} id="name" name="name" onChange={onChange}/>
                    </label>
                </div>
                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Todo description</div>
                        <input type="text" placeholder="Merry Xmas" id="description" value={todo.description} name="description" onChange={onChange}/>
                    </label>
                 </div>
            </div>
                <div className={styles.button_container}>
                {
                    !isEdit && <Button color="white" onClick={onClick}>Add new task</Button>
                }
                {
                    isEdit && <Button color="black" onClick={onClick}>Edit</Button>
                }
                
                </div>
        </div>
    )
}