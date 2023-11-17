import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type PropsType = {
  tooltipTitle: string;
  onClickDeleteHandler: () => void
}

export function DeleteItem(props: PropsType) {
  return (
  <Tooltip title={props.tooltipTitle}>
    <Button onClick={props.onClickDeleteHandler} className="btn-delete" type="link" size="small" danger icon={<DeleteOutlined />}></Button>
  </Tooltip>
  )
}
