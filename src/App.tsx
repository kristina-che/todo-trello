import React, { useState } from 'react';
import './App.css';
import {PropsTask, TodoList} from './TodoList';
import uuid from 'react-uuid';
import { AddItemForm } from './components/AddItemForm';


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

  const [filter, setFilter] = useState<filterType>("all");

  const todolist1 = uuid();
  const todolist2 = uuid();

  const [todoLists, setTodoLists] = useState<Array<todoListPrpos>>([
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "active"},
  ])

const [tasks, setTasks] = useState({
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
    console.log(todoListFilter)
    if(todoListFilter) {
      todoListFilter.filter = valueFilter;
      setTodoLists([...todoLists])
    }
  }
  

  const removeTask = (id: string, idTodoList: string) => {
    const tasksArr = tasks[idTodoList];
    const filterRemovedTasks = tasksArr.filter(task => task.id !== id);
    tasks[idTodoList] = filterRemovedTasks;
    return setTasks({...tasks})
  }
  const addTask = (inputValue: string, idTodoList: string) => {
    let newTask = {id: uuid(), title: inputValue, isDone: false}
    tasks[idTodoList] = [newTask, ...tasks[idTodoList]]
    return setTasks({...tasks}) 
  }

  const addTodoList = (inputValue: string, idTodoList: string) => {
    setTodoLists([{
      idTodoList: idTodoList, 
      titleTodoList: inputValue, 
      filter: 'all'
    }, 
    ...todoLists]) 

    setTasks({[idTodoList]: [], ...tasks})
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

  return (
    <div className="App">

      <AddItemForm idTodoList={uuid()} addTask={addTodoList} />

      {todoLists.map(tl => {
        let tasksForFilter = tasks[tl.idTodoList];
        if(filter === "done") {
          tasksForFilter = tasksForFilter.filter(task => task.isDone === true)
        }
        if(filter === "active") {
          tasksForFilter = tasksForFilter.filter(task => task.isDone === false)
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
                      deleteTodoList={deleteTodoList}
            />
        )
      })}
    </div>
  );
}


export default App;
