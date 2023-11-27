import uuid from 'react-uuid';
import { todoListPrpos } from '../App';
import { addTodolistActionCreator, changeFilterTodolistActionCreator, changeTodolistActionCreator, changeTodoListFilterActionType, removeTodolistActionCreator, todolistReducer } from './todolist-reducer';



test('correct todo list should be remove', () => {
  const todolist1 = uuid();
  const todolist2 = uuid();
  
  const startState: todoListPrpos[] = [
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, removeTodolistActionCreator(todolist1))

  expect(endState.length).toBe(1)
  expect(endState[0].idTodoList).toBe(todolist2)
})

test('correct add todo list', () => {
  const todolist1 = uuid();
  const todolist2 = uuid();
  const newTitle = "Test title";
  
  const startState: todoListPrpos[] = [
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, addTodolistActionCreator(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].titleTodoList).toBe(newTitle)
  expect(endState[2].filter).toBe('all')
})

test('correct change title', () => {
  const todolist1 = uuid();
  const todolist2 = uuid();
  const newTitleTodo = "New title todo!";

  const startState: todoListPrpos[] = [
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, changeTodolistActionCreator(todolist2, newTitleTodo))

  expect(endState.length).toBe(2);

  expect(endState[0].titleTodoList).toBe("Learn")
  expect(endState[1].titleTodoList).toBe(newTitleTodo)
})

test('correct change todolist filter', () => {
  const todolist1 = uuid();
  const todolist2 = uuid();
  const newFilterTodo = "active";

  const startState: todoListPrpos[] = [
    {idTodoList: todolist1, titleTodoList: "Learn", filter: "all"},
    {idTodoList: todolist2, titleTodoList: "What I should buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, changeFilterTodolistActionCreator(todolist2, newFilterTodo))

  expect(endState.length).toBe(2);

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilterTodo)
})



