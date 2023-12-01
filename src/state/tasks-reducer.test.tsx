import { tasksStateType } from '../App';
import { PropsTask } from '../components/TodoList/TodoList';
import { addTaskActionCreator, changeStatusTaskActionCreator, changeTitleTaskActionCreator, removeTaskActionCreator, tasksReducer } from './tasks-reducer';
import { addTodolistActionCreator, removeTodolistActionCreator } from './todolist-reducer';

test('correct delete task for todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }
  const action = removeTaskActionCreator("todolist1", "0")
  const endState = tasksReducer(startState, action)

  expect(endState["todolist1"].length).toBe(3);
  expect(endState["todolist2"].length).toBe(2);
  expect(endState["todolist1"].every((t: PropsTask) => t.id !== "0")).toBeTruthy()
})

test('correct add task for todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }

  const endState = tasksReducer(startState, addTaskActionCreator("todolist2", "New task"))

  expect(endState["todolist1"].length).toBe(4);
  expect(endState["todolist2"].length).toBe(3);
  expect(endState["todolist2"][0].id).toBeDefined();
  expect(endState["todolist2"][0].title).toBe("New task");
  expect(endState["todolist2"][0].isDone).toBe(false);
})

test('correct change status task for todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }

  const action = changeStatusTaskActionCreator("todolist2", "0", true);
  const endState = tasksReducer(startState, action)

  expect(endState["todolist1"].length).toBe(4);
  expect(endState["todolist2"].length).toBe(2);
  expect(endState["todolist2"][0].isDone).toBeTruthy();
  expect(endState["todolist2"][1].isDone).toBeTruthy();
})

test('correct change title task for todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }

  const action = changeTitleTaskActionCreator("todolist2", "0", "New title");
  const endState = tasksReducer(startState, action)

  expect(endState["todolist1"].length).toBe(4);
  expect(endState["todolist2"].length).toBe(2);
  expect(endState["todolist2"][0].title).toBe("New title");
})

test('correct add props when add todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }
  const action = addTodolistActionCreator("New title for todolist");
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todolist1" && k !== "todolist2");

  if(!newKey) {
    throw Error("new key should be added")
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
})

test('correct remove props when deleted todolist', () => {
  const startState: tasksStateType = {
    "todolist1": [
      {id: "0", title: "JavaScript", isDone: true},
      {id: "1", title: "React", isDone: false},
      {id: "2", title: "TypeScript", isDone: true},
      {id: "3", title: "React Query", isDone: false},
    ],
    "todolist2": [
      {id: "0", title: "Milk", isDone: false},
      {id: "1", title: "Bread", isDone: true},
    ],
  }
  const action = removeTodolistActionCreator("todolist2");
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolist2"]).not.toBeDefined();
})