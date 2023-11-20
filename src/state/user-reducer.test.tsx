import { userReducer } from './user-reducer';

test('user reduce should increment only age', () => {
  const startState = {age: 20, childrenCount: 2, name: "Alex"}
  const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
});


test('user resucer shoul increment only childrenCount', () => {
  const startState = {age: 20, childrenCount: 2, name: "Alex"  }
  const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

  expect(endState.childrenCount).toBe(3)
  expect(endState.age).toBe(20)
})

test('change name of user', () => {
  const startState = {name: 'Alex', age: 20, childrenCount: 2}
  const newName = 'Sonya'
  const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName});

  expect(endState.name).toBe(newName)
})