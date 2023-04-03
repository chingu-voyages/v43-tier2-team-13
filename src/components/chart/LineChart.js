import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { MarketHistoryDataSample } from '../../utils/sample-data';

function LineChart() {
  const { Title } = Typography;

  const dataPoints = MarketHistoryDataSample.prices.map((priceData) => ({
    x: new Date(priceData[0]),
    y: priceData[1],
  }));

  const lineChart = {
    options: {
      colors: ['#41e2ba'],
      xaxis: {
        type: 'datetime',
        labels: {
          show: true,
          formatter: (value, timestamp) => {
            const date = new Date(timestamp);
            return new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(date);
          },
          style: {
            colors: '#000',
            fontWeight: 'bold',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => Math.floor(value),
          style: {
            colors: '#000',
            fontWeight: 'bold',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Prices',
        data: dataPoints,
      },
    ],
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Price Chart</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={'100%'}
      />
    </>
  );
}

export default LineChart;
