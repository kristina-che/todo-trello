import React, { ChangeEvent } from 'react';
import { Button } from 'antd';

import { filterType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';


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
  addItem: (inputValue: string, idTodoList: string) => void
  deleteTodoList: (idTodoList: string) => void;
  changeCheckbox: (id: string, isCheck: boolean, idTodoList: string) => void
  changeTitleTask: (newTitle: string, idTodoList: string, idTask: string) => void
  changeTitle: (newTitle: string, idTodoList: string) => void
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

  const addTask = (title: string) => {
    props.addItem(title, props.idTodoList)
  }

  const changeTitle = (newTitle: string) => {
    props.changeTitle(newTitle, props.idTodoList)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitleTask={changeTitle} /><button onClick={deleteTodoListHandler}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        <ul>
          {props.tasks.map((item) =>  {
            const onRemoveHandler = () => {
              props.removeTask(item.id, props.idTodoList)
            }
            const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeCheckbox(item.id, e.currentTarget.checked, props.idTodoList)
            }
            const changeTitleTask = (newTitle: string) => {
              props.changeTitleTask(newTitle, props.idTodoList, item.id)
              console.log(props.idTodoList)
            }
          
            return (
              <li key={item.id}>
                <input type="checkbox" 
                       checked={item.isDone} 
                       onChange={changeCheckboxHandler}
                />
                <EditableSpan title={item.title} changeTitleTask={changeTitleTask} />
                <Button onClick={onRemoveHandler} className="btn-delete" type="link" size="small" danger> x </Button>
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
