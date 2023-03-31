import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { MarketHistoryDataSample } from '../../utils/sample-data';

function EChart() {
  const { Title } = Typography;

  const timestamps = MarketHistoryDataSample.market_caps.map(
    (marketData) => new Date(marketData[0])
  );
  const prices = MarketHistoryDataSample.market_caps.map(
    (marketData) => marketData[1]
  );

  const eChart = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      colors: ['#0197f6'],
      xaxis: {
        categories: timestamps,
        labels: {
          show: true,
          formatter: (value) => {
            if (!value) {
              return value;
            }
            const date = new Date(value);
            return new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
            }).format(date);
          },
          style: {
            colors: '#ffffff',
            fontWeight: 'bold',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return value >= 1e9 ? Math.floor(value / 1e9) + 'B' : value;
          },
          style: {
            colors: '#ffffff',
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
        data: prices,
      },
    ],
  };

  return (
    <div id="chart">
      <Title level={5}>Market Cap Chart</Title>
      <ReactApexChart
        className="bar-chart"
        options={eChart.options}
        series={eChart.series}
        type="bar"
        height={370}
      />
    </div>
  );
}

export default EChart;
