import React, { useState } from 'react';
import {  Card, Checkbox, Radio} from 'antd';

import { filterType } from '../../App';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { DeleteItem } from '../DeleteItem/DeleteItem';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import './styles.css';

export type PropsTask = {
  id: string;
  title: string;
  isDone: boolean;
}

type StatusBtn = "all" | "active" | "done"


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

  const [statusButton, setStatusButton] = useState<StatusBtn>()


  const onChangeStatusButtonHandler = (statusBtn: StatusBtn) => {
    props.changeFilter(statusBtn, props.idTodoList)
  }

  const deleteTodoListHandler = () => {
    props.deleteTodoList(props.idTodoList)
  }

  const addTask = (title: string) => {
    props.addItem(title, props.idTodoList)
  }

  const changeTitle = (newTitle: string) => {
    props.changeTitle(newTitle, props.idTodoList)
  }

  return (
    <Card title={<h3>
                    <EditableSpan title={props.title} changeTitleTask={changeTitle} />
                    <DeleteItem tooltipTitle="" onClickDeleteHandler={deleteTodoListHandler} />
                </h3>}
          className="content-card" 
    >
        <AddItemForm addItem={addTask} placeholder="New task" />
        <div>
          <ul className='item-list'>
            {props.tasks.map((item) =>  {
              const onRemoveHandler = () => {
                props.removeTask(item.id, props.idTodoList)
              }
              const changeCheckboxHandler = (e: CheckboxChangeEvent) => {
                props.changeCheckbox(item.id, e.target.checked, props.idTodoList)
              }
              const changeTitleTask = (newTitle: string) => {
                props.changeTitleTask(newTitle, props.idTodoList, item.id)
              }
              return (
                <li key={item.id}>
                  <Checkbox onChange={changeCheckboxHandler} checked={item.isDone} ></Checkbox> 
                  <EditableSpan title={item.title} changeTitleTask={changeTitleTask} />
                  <DeleteItem tooltipTitle="delete" onClickDeleteHandler={onRemoveHandler} />
                </li>
              )
            })}
          </ul>
        </div>
          <Radio.Group value={statusButton} onChange={(e) => onChangeStatusButtonHandler(e.target.value)}>
            <Radio.Button value="all" className={props.filter === 'all' ? 'active-btn' : ''}>All</Radio.Button>
            <Radio.Button value="active" className={props.filter === 'active' ? 'active-btn' : ''}>Active</Radio.Button>
            <Radio.Button value="done" className={props.filter === 'done' ? 'active-btn' : ''}>Done</Radio.Button>
          </Radio.Group>
    </Card>

  )
}
