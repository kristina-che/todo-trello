import { tasksStateType, todoListPrpos } from '../App';
import { tasksReducer } from './tasks-reducer';
import { addTodolistActionCreator, todolistReducer } from './todolist-reducer';


test('ids should be equals', () => {
  const startTasksState: tasksStateType = {};
  const startTodoListsState: todoListPrpos[] = []


  const action = addTodolistActionCreator("New title for todolist");
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodoListState = todolistReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListState[0].idTodoList;

  expect(idFromTasks).toBe(action.idTodoList);
  expect(idFromTodoLists).toBe(action.idTodoList);

})

