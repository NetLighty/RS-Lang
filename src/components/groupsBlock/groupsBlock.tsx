import React from 'react';
import GroupButton from './groupsButton';

function GroupsBlock() {
  return (
    <div className="book__groups">
      <GroupButton index={1} color="darkBrown" active="book__group__button-active" span="book__group__span-active" />
      <GroupButton index={2} color="lightBrown" />
      <GroupButton index={3} color="lightPink" />
      <GroupButton index={4} color="darkBlue" />
      <GroupButton index={5} color="lightOrange" />
      <GroupButton index={6} color="darkOrange" />
    </div>
  );
}

export default GroupsBlock;
