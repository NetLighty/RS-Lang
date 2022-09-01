import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(255);
  const navigate = useNavigate();

  const tick = () => {
    setTimeLeft(timeLeft - 1);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (timeLeft > 0) {
      timer = setInterval(() => tick(), 1000);
    } else {
      navigate('../sprint/result');
    }
    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <div>{timeLeft}</div>
  );
};

export default Timer;
