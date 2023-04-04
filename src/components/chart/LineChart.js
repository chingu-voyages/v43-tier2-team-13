import ReactApexChart from 'react-apexcharts';
import { Typography, Button } from 'antd';
import { MarketHistoryDataSample } from '../../utils/sample-data';
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';

function LineChart({ selectedCoin }) {
  const { Title } = Typography;
  const [data, setData] = useState(MarketHistoryDataSample);
  const [days, setDays] = useState(14);
  const { handleMarketHistoryData } = useApi(selectedCoin?.id, days);

  useEffect(() => {
    handleMarketHistoryData(selectedCoin?.id, days).then(
      (res) => {
        setData(res);
      },
      () => {
        setData(MarketHistoryDataSample);
      }
    );
  }, [selectedCoin?.id, days]);

  const dataPoints = data.prices.map((priceData) => ({
    x: new Date(priceData[0]),
    y: priceData[1],
  }));

  const lineChart = {
    options: {
      colors: ['#1990FF'],
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
          formatter: (value) => parseFloat(value).toFixed(2),
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <>
            <Title level={5}>Price Chart</Title>
            <div
              className="icon-box"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '20px',
                maxHeight: '30px',
                minWidth: '150px',
              }}
            >
              <Title level={5} style={{ color: 'white' }}>
                {selectedCoin?.id}
              </Title>
            </div>
          </>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <Button
          type="primary"
          className="ant-btn-sm ant-btn-block"
          style={{
            maxWidth: '90px',
            backgroundColor: days === 14 ? '#52C41A' : '',
            borderColor: days === 14 ? '#52C41A' : '',
          }}
          onClick={() => setDays(14)}
        >
          14 days
        </Button>
        <Button
          type="primary"
          className="ant-btn-sm ant-btn-block"
          style={{
            maxWidth: '90px',
            backgroundColor: days === 30 ? '#52C41A' : '',
            borderColor: days === 30 ? '#52C41A' : '',
            marginLeft: '10px',
          }}
          onClick={() => setDays(30)}
        >
          30 days
        </Button>
      </div>
    </>
  );
}

export default LineChart;
