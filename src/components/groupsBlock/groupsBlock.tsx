import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteClass } from '../../utils/classes';
import { addCurrentGroup, addCurrentPage } from '../../store/textbook.actions';
import GroupButton from './groupsButton';

const GroupsBlock = () => {
  const dispatch = useDispatch();
  const group = Number(localStorage.getItem('bookGroup'));

  function setGroup(event:React.MouseEvent<HTMLDivElement> |
  React.KeyboardEvent<HTMLDivElement>):void {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('book__group__button')) {
      deleteClass('book__group__button-active');
      deleteClass('book__group__span-active');
      target.classList.add('book__group__button-active');
      target.closest('.book__group__span')?.classList.add('book__group__span-active');
      dispatch(addCurrentGroup(Number(target.innerText) - 1));
      dispatch(addCurrentPage(0));
      localStorage.setItem('bookGroup', JSON.stringify(Number(target.innerText) - 1));
      localStorage.setItem('bookPage', JSON.stringify(0));
    }
  }

  useEffect(() => {
    const buttons = document.querySelectorAll('.book__group__button ');
    if (group) {
      buttons[group].classList.add('book__group__button-active');
      buttons[group].closest('.book__group__span')?.classList.add('book__group__span-active');
    } else {
      buttons[0].classList.add('book__group__button-active');
      buttons[0].closest('.book__group__span')?.classList.add('book__group__span-active');
    }
  }, [group]);

  return (
    <div className="book__groups" onClick={setGroup} onKeyDown={setGroup} role="presentation">
      <GroupButton index={1} color="darkBrown" />
      <GroupButton index={2} color="lightBrown" />
      <GroupButton index={3} color="lightPink" />
      <GroupButton index={4} color="darkBlue" />
      <GroupButton index={5} color="lightOrange" />
      <GroupButton index={6} color="darkOrange" />
    </div>
  );
};

export default GroupsBlock;
