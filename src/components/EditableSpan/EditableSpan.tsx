import { Input } from 'antd';
import React, { useState, ChangeEvent } from 'react';

type PropsType = {
  title: string
  changeTitleTask: (titleTask: string) => void
} 

export function EditableSpan(props: PropsType) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activeModeEdit = () => {
    setIsEditMode(true)
    setTitle(props.title)
  }
  const activeModeView = () => {
    setIsEditMode(false)
    props.changeTitleTask(title)
  }
  
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <span onClick={activeModeEdit} onBlur={activeModeView}>
      {isEditMode ? <Input value={title} size="small" className="input-edit" onChange={onChangeTitleHandler} autoFocus />: props.title}
    </span>
  )
}
