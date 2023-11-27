
import { tasksStateType } from '../App';

export type removeTaskActionType = {
  type: 'REMOVE-TASK',
  idTodoList: string,
  taskId: string
}

type ActionType = removeTaskActionType 

export const tasksReducer = (state: tasksStateType, action: ActionType) => {
  switch(action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state};
      const arrState = stateCopy[action.idTodoList];
      const filterRemovedTasks = arrState.filter(task => task.id !== action.taskId)
      stateCopy[action.idTodoList] = filterRemovedTasks;
      return stateCopy
    }
 
    default: 
        throw new Error("I don't understand this action type")
  }
}

export const removeTaskActionCreator = (idTodoList: string, taskId: string):removeTaskActionType => {
  return {type: 'REMOVE-TASK', idTodoList, taskId}
}

