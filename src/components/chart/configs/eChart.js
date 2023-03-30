import { last30DaysVolumes, last30DaysTimestamps } from '../EChart';

const eChart = {
  series: [
    {
      name: 'Total Volumes',
      data: last30DaysVolumes,
    },
  ],

  options: {
    chart: {
      id: 'basic-bar',
      type: 'histogram',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 2,
    },
    xaxis: {
      categories: last30DaysTimestamps,
      labels: {
        formatter: (value, timestamp) =>
          new Date(timestamp).toLocaleDateString(),
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  },
};

export default eChart;
