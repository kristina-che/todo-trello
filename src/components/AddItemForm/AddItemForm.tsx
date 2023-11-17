import { Button, Col, Input, Row, Space } from 'antd';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';


type PropsType = {
  addItem: (inputValue: string) => void
  placeholder?: string;
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
      props.addItem(inputValueTrim);
      setInputValue("");
    } else {
      setError("Required field")
    }
  }

  return (
    <Row>
      <Col>
        <Space.Compact style={{ width: '100%' }}>
          <Input value={inputValue} 
                onChange={onNewTaskChangeHandler}
                onKeyUp={onKeyUpHandler} 
                className={error && `error-input`}
                placeholder={props.placeholder}
          />
          {error && <div className="error">{error}</div>}
          <Button type="primary" onClick={onAddTaskClickHandler}>Add</Button>
        </Space.Compact>
      </Col>
    </Row>

  )
}