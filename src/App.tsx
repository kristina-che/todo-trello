import React, { useState } from 'react';
import './App.css';
import {PropsTask, TodoList} from './components/TodoList/TodoList';
import uuid from 'react-uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import {  Col, Row } from 'antd';

export type filterType = "all" | "active" | "done"
type todoListPrpos = {
  idTodoList: string,
  titleTodoList: string,
  filter: filterType
}

type tasksStateType = {
  [key: string]: PropsTask[]
}

function App() {
  const todolist1 = uuid();
  const todolist2 = uuid();

  const [todoLists, setTodoLists] = useState<Array<todoListPrpos>>([
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "all"},
  ])

  const [tasks, setTasks] = useState<tasksStateType>({
    [todolist1]: [
      {id: uuid(), title: "JavaScript", isDone: true},
      {id: uuid(), title: "React", isDone: false},
      {id: uuid(), title: "TypeScript", isDone: true},
      {id: uuid(), title: "React Query", isDone: false},
    ],
    [todolist2]: [
      {id: uuid(), title: "Milk", isDone: false},
      {id: uuid(), title: "Bread", isDone: true},
      {id: uuid(), title: "Noodle", isDone: true},
      {id: uuid(), title: "Juice", isDone: false},
    ],
  })

  const changeFilter = (valueFilter: filterType, idTodoList: string) => {
    const todoListFilter = todoLists.find(tl => tl.idTodoList === idTodoList)
    if(todoListFilter) {
      todoListFilter.filter = valueFilter;
      //setFilter(valueFilter)
      setTodoLists([...todoLists])
    }
  }

  const removeTask = (id: string, idTodoList: string) => {
    const tasksArr = tasks[idTodoList];
    const filterRemovedTasks = tasksArr.filter(task => task.id !== id);
    tasks[idTodoList] = filterRemovedTasks;
    return setTasks({...tasks})
  }

  const addItem = (inputValue: string, idTodoList: string) => {
    let newTask = {id: uuid(), title: inputValue, isDone: false}
    tasks[idTodoList] = [newTask, ...tasks[idTodoList]]
    return setTasks({...tasks}) 
  }

  const addTodoList = (inputValue: string) => {
    const newId = uuid();
    setTodoLists([{
      idTodoList:newId, 
      titleTodoList: inputValue, 
      filter: 'all'
    }, 
    ...todoLists]) 

    setTasks({[newId]: [], ...tasks})
  }
  
  const changeCheckbox = (id: string, isChecked: boolean, idTodoList: string) => {

    let task = tasks[idTodoList].find(item => item.id === id);
    if(task) {
      task.isDone = isChecked
      setTasks({...tasks})
    }
  }

  const deleteTodoList = (idTodoList: string) => {
    let filterDeleteTodoList = todoLists.filter(td => td.idTodoList !== idTodoList)
    setTodoLists(filterDeleteTodoList)
    delete tasks[idTodoList]
    setTasks({...tasks})
  }

  const changeTitleTask = (newTitle: string, idTodoList: string, idTask: string) => {
    let newTitleTask = tasks[idTodoList].find(task => idTask === task.id)
    if(newTitleTask) {
      newTitleTask.title = newTitle;
      setTasks({...tasks})
    }
  }

  const changeTitle = (newTitleValue: string, idTodoList: string) => {
    let newTodoList = todoLists.find(todoList => todoList.idTodoList === idTodoList);
    if(newTodoList) {
      newTodoList.titleTodoList = newTitleValue
    }
    setTodoLists([...todoLists])
  }

  return (
    <div id="parallax">
    <Row className="app" justify="center">
      <Col span={12}>
        <Row justify="center" className='title-block'>
          <Col>
            <h1>Todo list</h1>
            <span className="after-h1">create your own task scheduler</span>
          </Col>
        </Row>
      
        <AddItemForm addItem={addTodoList} placeholder="New todo list" />
        <Row gutter={30} className='content-todolist'>
          {todoLists.map(tl => {
            let tasksForFilter = tasks[tl.idTodoList];

            if(tl.filter === "done") {
              tasksForFilter = tasksForFilter.filter(task => task.isDone === true)
          
            }
            if(tl.filter === "active") {
              tasksForFilter = tasksForFilter.filter(task => task.isDone === false)
            }

            return (
              <Col>
                    <TodoList key={tl.idTodoList}
                              title={tl.titleTodoList}
                              idTodoList={tl.idTodoList}
                              tasks={tasksForFilter} 
                              removeTask={removeTask} 
                              changeFilter={changeFilter}
                              addItem={addItem} 
                              changeCheckbox={changeCheckbox}
                              filter={tl.filter}
                              deleteTodoList={deleteTodoList}
                              changeTitleTask={changeTitleTask}
                              changeTitle={changeTitle}
                    />
              </Col>   
            )
          })}
        </Row>
      </Col>
    </Row>
    </div>
  );
}


export default App;
