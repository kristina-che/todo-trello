import uuid from 'react-uuid';
import { todoListPrpos } from '../App';

export type removeTodoListActionType = {
  type: 'REMOVE-TODOLIST',
  idTodoList: string
}
export type addTodoListActionType = {
  type: 'ADD-TODOLIST',
  titleTodoList: string
}
export type changeTodoListTitleActionType = {
  type: 'CHANGE-TITLE',
  idTodoList: string,
  titleTodoList: string
}
export type changeTodoListFilterActionType = {
  type: 'CHANGE-FILTER',
  idTodoList: string,
  filter: 'all' | 'active' | 'done'
}

type ActionType = removeTodoListActionType | addTodoListActionType | changeTodoListTitleActionType | changeTodoListFilterActionType

export const todolistReducer = (state: todoListPrpos[], action: ActionType) => {
  switch(action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(td => td.idTodoList !== action.idTodoList)
    }
    case 'ADD-TODOLIST': {
      return [
        ...state,
        {idTodoList: uuid(), titleTodoList: action.titleTodoList, filter: 'all'},
      ]
    }
    case 'CHANGE-TITLE': {
      const todolist = state.find(tl => tl.idTodoList ===  action.idTodoList)
      if(todolist) {
        todolist.titleTodoList = action.titleTodoList;
      }

      return [...state]
    }
    case 'CHANGE-FILTER': {
      const todolist = state.find(tl => tl.idTodoList ===  action.idTodoList)
      if(todolist) {
        todolist.filter = action.filter;
      }

      return [...state]
    }

    default: 
        throw new Error("I don't understand this action type")
  }
}

export const removeTodolistActionCreator = (idTodoList: string):removeTodoListActionType => {
  return {type: 'REMOVE-TODOLIST', idTodoList}
}

export const addTodolistActionCreator = (newTitle: string):addTodoListActionType => {
  return {type: 'ADD-TODOLIST', titleTodoList: newTitle}
}

export const changeTodolistActionCreator = (todolist2: string, newTitleTodo:string):changeTodoListTitleActionType => {
  return {
    type: "CHANGE-TITLE" as const,
    idTodoList: todolist2,
    titleTodoList: newTitleTodo
  }
}

export const changeFilterTodolistActionCreator = (idTodoList: string, newFilterTodo: 'all' | 'active' | 'done'):changeTodoListFilterActionType => {
  return {
    type: "CHANGE-FILTER" as const,
    idTodoList,
    filter: newFilterTodo
  }
}