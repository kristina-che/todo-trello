import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { filterType } from './App';

export type PropsTask = {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  tasks: Array<PropsTask>;
  removeTask: (id: string) => void
  changeFilter: (valueFilter: filterType, idTodoList: string) => void
  addTask: (inputValue: string) => void
  changeCheckbox: (id: string, isCheck: boolean) => void
  idTodoList: string,
  filter: "all" | "active" | "done"
}

export function TodoList(props: PropsType) {

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  
  const addNewTask = () => {
    const inputValueTrim = inputValue.trim()
    if(inputValueTrim !== "" && inputValue.trim()) {
      props.addTask(inputValueTrim);
      setInputValue("");
    } else {
      setError("Required field")
    }
  }

  const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === "Enter") {
      addNewTask()
    }
  }
  const onAddTaskClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    addNewTask()
  }
  const onAllClickHandler = () => props.changeFilter('all', props.idTodoList)
  const onActiveClickHandler = () => props.changeFilter('active', props.idTodoList)
  const onDoneClickHandler = () => props.changeFilter('done', props.idTodoList)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={inputValue} 
               onChange={onNewTaskChangeHandler}
               onKeyUp={onKeyUpHandler} 
               className={error && `error-input`}
          />
          {error && <div className="error">{error}</div>}
        <button onClick={onAddTaskClickHandler}>+</button>
      </div>
      <div>
        <ul>
          {props.tasks.map((item) =>  {
            const onRemoveHandler = () => {
              props.removeTask(item.id)
            }
            const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeCheckbox(item.id, e.currentTarget.checked)
            }
            return (
              <li key={item.id}>
                <input type="checkbox" 
                       checked={item.isDone} 
                       onChange={changeCheckboxHandler}
                />
                <span>{item.title}</span>
                <button onClick={onRemoveHandler}> x </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-btn" : ""}>All</button>
        <button onClick={onActiveClickHandler} className={props.filter === "active" ? "active-btn" : ""}>Active</button>
        <button onClick={onDoneClickHandler} className={props.filter === "done" ? "active-btn" : ""}>Done</button>
      </div>
    </div>
  )
}