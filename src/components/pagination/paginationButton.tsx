import React, {FC} from 'react'

interface PaginationWordProps {
 text: string
}

const PaginationButton:FC<PaginationWordProps> = ({text}) => {
  return (
    <button className='book__pagination__button'>{text}</button>
  )
}

export default PaginationButton
