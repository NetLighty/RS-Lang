import React, {FC} from 'react';

interface GroupsButtoProps{
  index: number;
  color: string
}

const GroupButton:FC<GroupsButtoProps> = ({index, color}) => {
  return (
    <button id={`${color}`} className='book__group__button'>{index}</button>
  )
}

export default GroupButton
