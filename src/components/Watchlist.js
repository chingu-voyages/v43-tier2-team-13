import React, {useState} from 'react'
import WatchlistCoin from '../watchlistClassConstructor';
import { useApi } from '../hooks/useApi';

import { Button } from "antd";
import { Table } from 'antd';

export default function Watchlist(props) {
    const { handleAllCoins } = useApi();
        
    const [watchlistCoins, setWatchlistCoins] = useState([])

    function addCoinToWatchlist(event){
        const clickedCoin = event.target.id
        if(watchlistCoins.some(coin => coin.id === clickedCoin)){
            console.log("already watchlisted")
            // add some sort of alert to user
        } else {
            handleAllCoins().then((res) => {
                const coinData = res.find(coin => clickedCoin === coin.id)
                let newCoin = new WatchlistCoin(coinData)
                setWatchlistCoins(prevCoins => ([...prevCoins, newCoin]))
            
            /* ideally I wouldn't fetch the data from the API and instead get it from props.coins,
                which I have passed down but couldn't make work because of state/re-renders */
            //   const coinData = res.find(coin => clickedCoin === coin.id)
            //   const newCoin = new WatchlistCoin(coinData)
            //   setWatchlistCoins(prevCoins => ([...prevCoins, newCoin]))
                })
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
            title: 'Icon',
            dataIndex: 'image',
            key: 'image',
            render: image => <img src={image} style={{width: '20px'}} alt='coin symbol'/>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}}>{text} ({record.symbol})</span>,
        },
        {
            title: 'Current Price',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
        },
        {
            title: 'All Time High',
            dataIndex: 'ath',
            key: 'ath',
        },
        {
            title: '24h High',
            key: 'high24h',
            dataIndex: 'high24h'
        },
        {
            title: '24h Low',
            key: 'low24h',
            dataIndex: 'low24h'
        },
        {
            title: 'Market Cap',
            key: 'mktCap',
            dataIndex: 'mktCap'
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
            <Button id="bitcoin" type="primary" danger onClick={(event)=> addCoinToWatchlist(event)}>
            +
            </Button>
            
            <Table className="watchlist-table" columns={columns} dataSource={watchlistCoins} />
        </div>
    )
}
