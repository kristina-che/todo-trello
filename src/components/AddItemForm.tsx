import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';


type PropsType = {
  addTask: (inputValue: string, idTodoList: string) => void
  idTodoList: string,
}


export function AddItemForm(props: PropsType) {

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === "Enter") {
      addNewTask()
    }
  }
  const onAddTaskClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    addNewTask()
  }

  const addNewTask = () => {
    const inputValueTrim = inputValue.trim()
    if(inputValueTrim !== "" && inputValue.trim()) {
      props.addTask(inputValueTrim, props.idTodoList);
      setInputValue("");
    } else {
      setError("Required field")
    }
  }

  return (
    <div>
    <input value={inputValue} 
           onChange={onNewTaskChangeHandler}
           onKeyUp={onKeyUpHandler} 
           className={error && `error-input`}
      />
      {error && <div className="error">{error}</div>}
    <button onClick={onAddTaskClickHandler}>+</button>
  </div>
  )
}