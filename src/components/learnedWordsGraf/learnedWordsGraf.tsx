import React, { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import './learnedWordsGraf.scss';
import { IStatistic } from '~/models/IStatistic';

ChartJS.register(...registerables);

interface LearnedWordsGrafProps {
  header: string,
  lbl: string,
  labelsArray: string[],
  dataArray: number[],
}
const LearnedWordsGraf: FC<LearnedWordsGrafProps> = ({
  header, lbl, labelsArray, dataArray,
}) => {
  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: lbl,
        data: dataArray,
        fill: '#EBD9C8',
        backgroundColor: '#EBD9C8',
        borderColor: '#DE6600',
      },
    ],
  };

  return (
    <div className="graf">
      <p className="graf__header">{header}</p>
      <Line className="graf__content" datasetIdKey="id" data={data} />
    </div>
  );
};

export default LearnedWordsGraf;
