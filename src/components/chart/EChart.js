import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import eChart from './configs/eChart';

function EChart() {
  const { Title } = Typography;

  return (
    <div id="chart">
      <Title level={5}>Active Users</Title>
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
