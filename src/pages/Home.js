import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import Watchlist from '../components/Watchlist';
import LineChart from '../components/chart/LineChart';
import { HomeCards } from '../components/home-cards/home-cards.component';
import { CardLoader } from '../components/card-loader/card-loader.component';
import { sampleData } from '../utils/sample-data';
import { Card, Col, Row, Typography, Skeleton, Input } from 'antd';
// import { StarOutlined, StarFilled } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import './Home.css';

const Home = () => {
  const { Title, Text } = Typography;

  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(sampleData);
  const [addToWatchlist, setAddToWatchlist] = useState();
  const { handleAllCoins } = useApi();

  // ----------------- UseEffects -----------------
  // Use API data if request is resolved and use sampledata if it is rejected
  useEffect(() => {
    // handleAllCoins().then(
    //   (res) => {
    //     setCoins(res);
    //     setFilteredCoins(res);
    //     setSelectedCoin(res[0]);
    //     setIsLoading(false);
    //   },
    //   () => {
        setCoins(sampleData);
        setFilteredCoins(sampleData);
        setSelectedCoin(sampleData[0]);
        setIsLoading(false);
      // }
    // );
  }, []);

  //------------- Event Handlers -----------------
  function handleClick(event) {
    setAddToWatchlist(event.target.id);
  }

  // Filter through coin list and return new list
  const onSearch = (e) => {
    const newCoinsList = coins.filter(
      (element) =>
        element.id
          .replaceAll('-', ' ')
          .includes(e.target.value.toLowerCase()) ||
        element.symbol.includes(e.target.value.toLowerCase())
    );
    setFilteredCoins(newCoinsList);
  };

  const cardsData = (selectedCoin) => [
    {
      id: '1',
      title: 'Price',
      value: selectedCoin.current_price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 3,
      }),
      percentage:
        selectedCoin.price_change_percentage_24h > 0
          ? `+${selectedCoin.price_change_percentage_24h?.toFixed(2)}%`
          : `${selectedCoin.price_change_percentage_24h?.toFixed(2)}%`,
      logo: '🚀',
    },
    {
      id: '2',
      title: 'Market Cap',
      value: selectedCoin.market_cap.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      percentage:
        selectedCoin.market_cap_change_percentage_24h > 0
          ? `+${selectedCoin.market_cap_change_percentage_24h?.toFixed(2)}%`
          : `${selectedCoin.market_cap_change_percentage_24h?.toFixed(2)}%`,
      logo: '📉',
    },
    {
      id: '3',
      title: 'Circulating Supply',
      value: selectedCoin.circulating_supply.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      percentage: '',
      logo: '💳',
    },
    {
      id: '4',
      title: 'Total Volume',
      value: selectedCoin.total_volume.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
      percentage: '',
      logo: '🏛️',
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {isLoading
            ? ['first', 'second', 'third', 'fourth'].map((element) => (
                <CardLoader key={element} />
              ))
            : selectedCoin &&
              cardsData(selectedCoin).map((card) => (
                <HomeCards key={card.id} cardsData={card} />
              ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart selectedCoin={selectedCoin} />
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
                  <div style={{ paddingInline: '24px', marginBottom: '12px' }}>
                    <Title level={4}>Search Coin</Title>
                    <Input
                      className="header-search"
                      placeholder="Search..."
                      prefix={<SearchOutlined />}
                      onChange={onSearch}
                    />
                  </div>
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
                      <thead className="table-row-head">
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Market Cap</th>
                          <th>High 24h</th>
                          <th>Low 24h</th>
                          <th>Price Change 24h</th>
                          <th>Max Supply</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCoins.length > 0 ? (
                          filteredCoins.map((coin) => (
                            <tr
                              key={coin.id}
                              onClick={() => setSelectedCoin(coin)}
                            >
                              <td>
                                <i
                                  className="fa-regular fa-star"
                                  style={{
                                    fontSize: '16px',
                                    color: 'orange',
                                    cursor: 'pointer',
                                    marginBottom: '7px',
                                  }}
                                  onClick={handleClick}
                                  id={coin.id}
                                ></i>
                              </td>
                              <td>
                                <h6
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    lineHeight: '16px',
                                  }}
                                >
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
                          <tr className="ant-table-placeholder">
                            <td colSpan={8} className="ant-table-cell">
                              <div className="ant-empty ant-empty-normal">
                                <div className="ant-empty-image">
                                  <svg class="ant-empty-img-simple" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse class="ant-empty-img-simple-ellipse" cx="32" cy="33" rx="32" ry="7"></ellipse><g class="ant-empty-img-simple-g" fill-rule="nonzero"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" class="ant-empty-img-simple-path"></path></g></g></svg>
                                </div>
                                <div class="ant-empty-description">No data</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
        {isLoading ? null : (
          <Watchlist
            allCoins={coins}
            addToWatchlist={addToWatchlist}
          />
        )}
      </div>
    </>
  );
};

export default Home;
