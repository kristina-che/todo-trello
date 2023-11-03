import React, { useState } from 'react';
import './App.css';
import {PropsTask, TodoList} from './TodoList';
import uuid from 'react-uuid';


// let task2: Array<PropsTask> = [
//   {id: 1, title: "Milk", isDone: false},
//   {id: 2, title: "Bread", isDone: false},
//   {id: 3, title: "Cabbage", isDone: true},
//   {id: 3, title: "Meat", isDone: true},
// ]

export type filterType = "all" | "active" | "done"
type todoListPrpos = {
  idTodoList: string,
  titleTodoList: string,
  filter: filterType
}

function App() {

  let initTasks: Array<PropsTask> = [
    {id: uuid(), title: "JavaScript", isDone: true},
    {id: uuid(), title: "React", isDone: false},
    {id: uuid(), title: "TypeScript", isDone: true},
    {id: uuid(), title: "React Query", isDone: false},
  ]

  const [tasks, setTasks] = useState<Array<PropsTask>>(initTasks);
  const [filter, setFilter] = useState<filterType>("all");


  const [todoLists, setTodoLists] = useState<Array<todoListPrpos>>([
    {idTodoList: uuid(), titleTodoList: "Learn", filter: "all"},
    {idTodoList: uuid(), titleTodoList: "What I should buy", filter: "active"},
  ])

  const changeFilter = (valueFilter: filterType, idTodoList: string) => {
    const todoListFilter = todoLists.find(tl => tl.idTodoList === idTodoList)
    console.log(todoListFilter)
    if(todoListFilter) {
      todoListFilter.filter = valueFilter;
      setTodoLists([...todoLists])
    }
  }
  

  const removeTask = (id: string) => {
    return setTasks(tasks.filter(task => task.id !== id))
  }
  const addTask = (inputValue: string) => {
    let newTask = {id: uuid(), title: inputValue, isDone: false}
    let newTasks = [newTask, ...tasks]
    return setTasks(newTasks) 
  }
  const changeCheckbox = (id: string, isChecked: boolean) => {
    let task = tasks.find(item => item.id === id);
    if(task) {
      task.isDone = isChecked
    }
 
    setTasks([...tasks])
  }

  return (
    <div className="App">
      {todoLists.map(tl => {
        let tasksForFilter = tasks;
        if(filter === "done") {
          tasksForFilter = tasks.filter(task => task.isDone === true)
        }
        if(filter === "active") {
          tasksForFilter = tasks.filter(task => task.isDone === false)
        }

        return (
          <TodoList key={tl.idTodoList}
                    title={tl.titleTodoList}
                    idTodoList={tl.idTodoList}
                    tasks={tasksForFilter} 
                    removeTask={removeTask} 
                    changeFilter={changeFilter}
                    addTask={addTask} 
                    changeCheckbox={changeCheckbox}
                    filter={tl.filter}
          />
        )
      })}
    </div>
  );
}


export default App;
