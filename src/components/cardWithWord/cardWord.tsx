import React, { FC } from 'react'
import { IWord } from './../../models/IWord'

interface CardWordProps{
  word: IWord;
}

const  CardWord:FC<CardWordProps> = ({word}) => {
  return (
    <div>
      {word.id}
    </div>
  )
}

export default CardWord

