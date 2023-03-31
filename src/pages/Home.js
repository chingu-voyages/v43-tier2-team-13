import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import Watchlist from '../components/Watchlist';
import Echart from '../components/chart/EChart';
import LineChart from '../components/chart/LineChart';
import { HomeCards } from '../components/home-cards/home-cards.component';
import { CardLoader } from '../components/card-loader/card-loader.component';
import { sampleData } from '../utils/sample-data';
import { Card, Col, Row, Typography, Skeleton, Input} from 'antd';
// import { StarOutlined, StarFilled } from '@ant-design/icons';
import {
  SearchOutlined,
} from "@ant-design/icons";
import './Home.css';

const { Search } = Input;

const Home = () => {
  const { Title, Text } = Typography;

  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [addToWatchlist, setAddToWatchlist] = useState('');

  const { handleAllCoins } = useApi();

  // ----------------- UseEffects -----------------
  // Use API data if request is resolved and use sampledata if it is rejected
  useEffect(() => {
    handleAllCoins().then((res) => {
      setCoins(res);
      setFilteredCoins(res);
      setSelectedCoin(res[0]);
      setIsLoading(false);
    }, () => {
      setCoins(sampleData);
      setFilteredCoins(sampleData);
      setSelectedCoin(sampleData[0]);
      setIsLoading(false);
    });

  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid, 'logged in')
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  //------------- Event Handlers -----------------
  function handleClick(event) {
    setAddToWatchlist(event.target.id);
  }

  // Filter through coin list and return new list
  const onSearch = (e) => {
    const newCoinsList = coins.filter((element) => 
      (element.id.replaceAll('-', ' ').includes(e.target.value.toLowerCase()) 
      || element.symbol.includes(e.target.value.toLowerCase()))
    );
    setFilteredCoins(newCoinsList);
  }

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
                  <div style={{paddingInline: '24px', marginBottom: '12px'}}>
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
                      <thead>
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
                                {/* <StarOutlined id={coin.id} style={{ fontSize: '16px' }} onClick={handleClick}/> */}
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
                          <tr>
                            <td colSpan={8}>
                              <Text style={{display: 'block', textAlign: 'center', fontSize: '1.25rem'}}>Data not available!</Text>
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
        {addToWatchlist ? (
          <Watchlist coins={coins} addToWatchlist={addToWatchlist} />
        ) : null}
      </div>
    </>
  );
};

export default Home;
