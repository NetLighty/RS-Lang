import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClass } from '../../utils/classes';
import { addCurrentGroup } from '../../store/textbook.actions';
import GroupButton from './groupsButton';

const GroupsBlock = () => {
  const dispatch = useDispatch();

  function setGroup(event:React.MouseEvent<HTMLDivElement> |
  React.KeyboardEvent<HTMLDivElement>):void {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('book__group__button')) {
      deleteClass('book__group__button-active');
      deleteClass('book__group__span-active');
      target.classList.add('book__group__button-active');
      target.closest('.book__group__span')?.classList.add('book__group__span-active');
      dispatch(addCurrentGroup(Number(target.innerText) - 1));
    }
  }
  return (
    <div className="book__groups" onClick={setGroup} onKeyDown={setGroup} role="presentation">
      <GroupButton index={1} color="darkBrown" active="book__group__button-active" span="book__group__span-active" />
      <GroupButton index={2} color="lightBrown" />
      <GroupButton index={3} color="lightPink" />
      <GroupButton index={4} color="darkBlue" />
      <GroupButton index={5} color="lightOrange" />
      <GroupButton index={6} color="darkOrange" />
    </div>
  );
};

export default GroupsBlock;
