import React, { FC, ReactNode } from 'react';
import './MyModal.scss';

interface MyModalProps {
  children: ReactNode;
  visible: boolean;
  setVisible: (b: boolean) => void;
}

// eslint-disable-next-line react/function-component-definition
const MyModal: FC<MyModalProps> = ({ children, visible, setVisible }) => {
  const rootClasses = ['myModal'];
  if (visible) {
    rootClasses.push('active');
  }

  return (
    <div
      className={rootClasses.join(' ')}
      role="button"
      tabIndex={-1}
      onClick={() => setVisible(false)}
      onKeyDown={() => setVisible(false)}
    >
      <div
        className="myModalContent"
        role="button"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
