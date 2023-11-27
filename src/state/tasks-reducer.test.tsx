import { tasksStateType } from '../App';
import { PropsTask } from '../components/TodoList/TodoList';
import { removeTaskActionCreator, tasksReducer } from './tasks-reducer';


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
