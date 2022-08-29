import React, { useEffect, useState } from 'react';
import { getAggregatedWordsForStatistic } from '~/utils/aggregatedWordsFunc';
import { getCookie, accesTokenName } from '~/utils/cookie';
import SETTINGS from '~/utils/settings';
import { IAggregatedResponse, IAggregated } from '~/models/IAggregated';
import HardWordCard from '../hardWordCard/hardWordCard';

const HardWordContainer = () => {
  const [wordsToRender, setWordsToRender] = useState<Array<IAggregated> | null>(null);
  const userId:string = localStorage.getItem('userId') as string;
  const userToken:string = getCookie(accesTokenName);
  const filter = SETTINGS.FILTER_HARD_WORDS;

  useEffect(() => {
    getAggregatedWordsForStatistic(userId, userToken, filter)
      .then((data) => {
        const result = data as IAggregatedResponse[];
        setWordsToRender(result[0].paginatedResults);
      })
      .catch(() => {});
  }, [userId, userToken, filter]);

  return (
    <div className="hard__words__cards">
      {wordsToRender?.length
        ? wordsToRender.map((word: IAggregated) => <HardWordCard key={word.id} word={word} />)
        : null}
    </div>
  );
};

export default HardWordContainer;
