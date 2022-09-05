import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './learnedWordsGraf.scss';

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
        fill: '#DE6600',
        backgroundColor: '#DE6600',
        borderColor: '#DE6600',
      },
    ],
  };

  return (
    <div className="graf">
      <p className="graf__header">{header}</p>
      <Bar className="graf__content" datasetIdKey="id" data={data} />
    </div>
  );
};

export default LearnedWordsGraf;
