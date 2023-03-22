import React, {useState} from 'react'
import WatchlistCoin from '../watchlistClassConstructor';

import { Table, Row, Col, Space } from "antd";

export default function Watchlist(props) {
        
    const [watchlistCoins, setWatchlistCoins] = useState([])

    function addCoinToWatchlist(event){
        const clickedCoin = event.target.id
        if(watchlistCoins.some(coin => coin.id === clickedCoin)){
            console.log("already watchlisted")
            // switch between filled/unfilled star
        } else {
              const coinData = props.coins.find(coin => clickedCoin === coin.id)
              const newCoin = new WatchlistCoin(coinData)
              console.log(newCoin)
              setWatchlistCoins(prevCoins => ([...prevCoins, newCoin]))
        }
    }

    function removeFromWatchlist(event){
        const id = event.target.id
        setWatchlistCoins(prevCoins => prevCoins.filter(coin => coin.id !== id))
    }

    const columns = [
        {    
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) =>   (<Space size="middle">
                                            <img src={record.image} style={{minWidth: '25px', maxWidth: '25px'}} alt='coin symbol'/>
                                            <span>{text} ({record.symbol})</span>
                                        </Space>),
        },
        {
            title: 'Price',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
        },
        {
            title: 'Market Cap',
            key: 'mktCap',
            dataIndex: 'mktCap'
        },
        {
            title: 'High 24h',
            key: 'high24h',
            dataIndex: 'high24h'
        },
        {
            title: 'Low 24h',
            key: 'low24h',
            dataIndex: 'low24h'
        },
        {
            title: '',
            key: 'remove',
            dataIndex: 'remove',
            render: (text, record) => <span style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} id={record.id} onClick={(event) => removeFromWatchlist(event)}>Remove</span>
        },
    ];


    return (
        <div>
            {/* Button included for testing purposes */}
            <button id="bitcoin" type="primary" danger onClick={(event)=> addCoinToWatchlist(event)}>
            +
            </button>

            {watchlistCoins?.length > 0 ? 
                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
                        <Table className="watchlist-table" columns={columns} dataSource={watchlistCoins} />
                    </Col>
                </Row>
            : null}
        </div>
    )
}
