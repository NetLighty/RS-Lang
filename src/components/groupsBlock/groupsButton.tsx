import React, { FC } from 'react';

interface GroupsButtonProps {
  index: number;
  color: string;
  active?: string;
  span?: string;
}

const GroupButton: FC<GroupsButtonProps> = ({
  index, color, active, span,
}) => (
  <span id={`${color}span`} className={`book__group__span ${span || ''}`}>
    <button type="button" id={`${color}`} className={`book__group__button ${active || ''}`}>
      {index}
    </button>
  </span>
);

GroupButton.defaultProps = {
  active: '',
  span: '',
};

export default GroupButton;
