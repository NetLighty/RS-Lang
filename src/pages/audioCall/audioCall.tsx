import React, { FC, useEffect, useState } from 'react';
import './audioCall.scss';
import { IWord } from '../../models/Iword';
import getWord from '../../api/wordsApi';

// eslint-disable-next-line react/function-component-definition
const AudioCall: FC = () => {
  const [levelWords, setLevelWord] = useState(Array<IWord>);
  async function fetchWord(group: string) {
    const res: Array<IWord> = await getWord(group);
    setLevelWord(res);
  }
  useEffect(() => {
    fetchWord(localStorage.audiolevel as string).then(
      () => {},
      () => {},
    );
  }, []);
  return (
    <div className="audiogame">
      <div>lala</div>
    </div>
  );
};

export default AudioCall;
