
import uuid from 'react-uuid';
import { tasksStateType } from '../App';
import { addTodoListActionType, removeTodoListActionType } from './todolist-reducer';

export type removeTaskActionType = {
  type: 'REMOVE-TASK',
  idTodoList: string,
  taskId: string
}
export type addTaskActionType = {
  type: 'ADD-TASK',
  idTodoList: string,
  titleNewTask: string
}
export type changeStatusTaskActionType = {
  type: 'CHANGE-STATUS-TASK',
  idTodoList: string,
  taskId: string,
  status: boolean
}
export type changeTitleTaskActionType = {
  type: 'CHANGE-TITLE-TASK',
  idTodoList: string,
  taskId: string,
  newTitle: string
}

type ActionType = removeTaskActionType | addTaskActionType | changeStatusTaskActionType 
| changeTitleTaskActionType | addTodoListActionType | removeTodoListActionType

export const tasksReducer = (state: tasksStateType, action: ActionType) => {
  switch(action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state};
      const arrState = stateCopy[action.idTodoList];
      const filterRemovedTasks = arrState.filter(task => task.id !== action.taskId)
      stateCopy[action.idTodoList] = filterRemovedTasks;
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state};
      const tasks = stateCopy[action.idTodoList];
      const newTask = {id: uuid(), title: action.titleNewTask, isDone: false}
      stateCopy[action.idTodoList] = [newTask, ...tasks]
      return stateCopy
    }
    case 'CHANGE-STATUS-TASK': {
      const stateCopy = {...state};
      const changeTask = stateCopy[action.idTodoList].find(t => t.id === action.taskId)
      if(changeTask) {
        changeTask.isDone = action.status;
      }
      return stateCopy
    }
    case 'CHANGE-TITLE-TASK': {
      const stateCopy = {...state};
      const changeTask = stateCopy[action.idTodoList].find(t => t.id === action.taskId)
      if(changeTask) {
        changeTask.title = action.newTitle;
      }
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state};
      stateCopy[action.idTodoList] = []
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.idTodoList]
      return stateCopy
    }
    default: 
      throw new Error("I don't understand this action type")
  }
}

export const removeTaskActionCreator = (idTodoList: string, taskId: string):removeTaskActionType => {
  return {type: 'REMOVE-TASK', idTodoList, taskId}
}

export const addTaskActionCreator = (idTodoList: string, titleNewTask: string):addTaskActionType => {
  return {type: 'ADD-TASK', idTodoList, titleNewTask}
}

export const changeStatusTaskActionCreator = (idTodoList: string, taskId: string, status: boolean):changeStatusTaskActionType => {
  return {type: 'CHANGE-STATUS-TASK', idTodoList, taskId, status}
}

export const changeTitleTaskActionCreator = (idTodoList: string, taskId: string, newTitle: string):changeTitleTaskActionType => {
  return {type: 'CHANGE-TITLE-TASK', idTodoList, taskId, newTitle}
}
