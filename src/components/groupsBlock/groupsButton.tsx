import React, { FC } from 'react';

interface GroupsButtonProps {
  index: number;
  color: string;
  active?: string
}

const GroupButton:FC<GroupsButtonProps> = ({ index, color, active }) => (
  <button type="button" id={`${color}`} className={`book__group__button ${active || ''}`}>{index}</button>
);

GroupButton.defaultProps = {
  active: '',
};

export default GroupButton;
