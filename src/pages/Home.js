import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import Watchlist from '../components/Watchlist';
import Echart from '../components/chart/EChart';
import LineChart from '../components/chart/LineChart';
import { Card, Col, Row, Typography, Skeleton } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { HomeCards } from '../components/home-cards/home-cards.component';
import './Home.css';

const Home = () => {
  const { Title, Text } = Typography;

  const [coins, setCoins] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState();

  const { handleAllCoins } = useApi();

  useEffect(() => {
    handleAllCoins().then((res) => {
      setCoins(res);
      setSelectedCoin(res[0]);
      setIsLoading(false);
    });
  }, []);

  console.log(selectedCoin);

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            {isLoading ? (
              <div style={{ padding: '20px' }}>
                <Skeleton active />
              </div>
            ) : (
              <>
                <HomeCards selectedCoin={selectedCoin} />
              </>
            )}
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              {isLoading ? (
                <div style={{ padding: '20px' }}>
                  <Skeleton active />
                </div>
              ) : (
                <>
                  <div className="project-ant">
                    <div>
                      <Title level={5}>Coin List</Title>
                    </div>
                    <div className="ant-filtertabs">
                      <div className="antd-pro-pages-dashboard-analysis-style-salesExtra"></div>
                    </div>
                  </div>
                  <div
                    className="ant-list-box table-responsive"
                    style={{ maxHeight: '500px', overflowY: 'auto' }}
                  >
                    <table className="width-100">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>Price</th>
                          <th>Market Cap</th>
                          <th>High 24h</th>
                          <th>Low 24h</th>
                          <th>Price Change 24h</th>
                          <th>Max Supply</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coins.length > 0 ? (
                          coins.map((coin) => (
                            <tr
                              key={coin.id}
                              onClick={() => setSelectedCoin(coin)}
                            >
                              <td>
                                <StarOutlined style={{ fontSize: '16px' }} />
                              </td>
                              <td>
                                <h6>
                                  <img
                                    src={coin.image}
                                    alt={`${coin.name} cryptocurrency`}
                                    className="avatar-sm mr-10"
                                  />{' '}
                                  {coin.name}
                                </h6>
                              </td>
                              <td>
                                {coin.current_price?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td>
                                {coin.market_cap?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                              <td>
                                {coin.high_24h?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td>
                                {coin.low_24h?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td
                                className={`${
                                  coin.price_change_percentage_24h > 0
                                    ? 'green-range'
                                    : 'red-range'
                                }`}
                              >
                                {coin.price_change_percentage_24h > 0
                                  ? `+${coin.price_change_percentage_24h?.toFixed(
                                      2
                                    )}%`
                                  : `${coin.price_change_percentage_24h?.toFixed(
                                      2
                                    )}%`}
                              </td>
                              <td>
                                {coin.max_supply?.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <Text>Data not available</Text>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
        <Watchlist coins={coins} />
      </div>
    </>
  );
};

export default Home;
