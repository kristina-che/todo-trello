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
  changeFilter: (valueFilter: filterType) => void
  addTask: (inputValue: string) => void
  changeCheckbox: (id: string, isCheck: boolean) => void
}

export function TodoList(props: PropsType) {

  const [inputValue, setInputValue] = useState("");

  const addNewTask = () => {
    props.addTask(inputValue);
    setInputValue("");
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
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onDoneClickHandler = () => props.changeFilter('done')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input  value={inputValue} 
                onChange={onNewTaskChangeHandler}
                onKeyUp={onKeyUpHandler} 
          />
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onDoneClickHandler}>Done</button>
      </div>
    </div>
  )
}