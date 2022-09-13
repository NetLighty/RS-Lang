import React, { FC, useEffect, useState } from 'react';

const Timer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  const tick = () => {
    setTimeLeft(timeLeft - 1);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (timeLeft > 0) {
      timer = setInterval(() => tick(), 1000);
    } else {
      // setSprintView('result');
    }
    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <div>{timeLeft}</div>
  );
};

export default Timer;
