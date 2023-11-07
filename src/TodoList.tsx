import React, { ChangeEvent } from 'react';
import { filterType } from './App';
import { AddItemForm } from './components/AddItemForm';

export type PropsTask = {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  tasks: Array<PropsTask>;
  removeTask: (id: string, idTodoList: string) => void
  changeFilter: (valueFilter: filterType, idTodoList: string) => void
  addTask: (inputValue: string, idTodoList: string) => void
  deleteTodoList: (idTodoList: string) => void;
  changeCheckbox: (id: string, isCheck: boolean, idTodoList: string) => void
  idTodoList: string,
  filter: "all" | "active" | "done"
}

export function TodoList(props: PropsType) {
  const deleteTodoListHandler = () => {
    props.deleteTodoList(props.idTodoList)
  }
  const onAllClickHandler = () => props.changeFilter('all', props.idTodoList)
  const onActiveClickHandler = () => props.changeFilter('active', props.idTodoList)
  const onDoneClickHandler = () => props.changeFilter('done', props.idTodoList)

  return (
    <div>
      <h3>{props.title}</h3><button onClick={deleteTodoListHandler}>x</button>
      <AddItemForm idTodoList={props.idTodoList} addTask={props.addTask} />
      <div>
        <ul>
          {props.tasks.map((item) =>  {
            const onRemoveHandler = () => {
              props.removeTask(item.id, props.idTodoList)
            }
            const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeCheckbox(item.id, e.currentTarget.checked, props.idTodoList)
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
