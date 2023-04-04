import React, {useEffect, useState} from 'react'
import WatchlistCoin from '../watchlistClassConstructor';
import { ref, child, update, onValue, push, get, query, orderByValue, equalTo, remove } from "firebase/database";
import { cryptoWorldDB, db } from '../firebaseConfig';
import { Table, Space } from "antd";

export default function Watchlist(props) {
    const {addToWatchlist, allCoins, loggedIn, userUID}  = props
    const [coinToAdd, setCoinToAdd] = useState('')
    const [watchlistCoinIDs, setWatchlistCoinIDs] = useState([])
    const [watchlistCoins, setWatchlistCoins] = useState([])
    
    useEffect(() => {
        if(addToWatchlist.length > 1){
            setCoinToAdd(addToWatchlist)
        }
    }, [addToWatchlist]);

    useEffect(() => {
        if(coinToAdd !== ''){
            addCoinToDBWatchlist(coinToAdd)
        }
    }, [coinToAdd])


    function addCoinToDBWatchlist(coinID){        
        if (watchlistCoinIDs.some((coin) => coin === coinID)) {
            console.log('already watchlisted');
        } else {
            const newPostKey = push(child(ref(db), 'watchlist')).key;
            const updates = {};
            updates[`/sharedPublicWatchlist/` + newPostKey] = coinID;
            update(cryptoWorldDB, updates);
        }
    }

    useEffect(() => {
        const dbRef = ref(db, `/cryptoWorld/sharedPublicWatchlist/`)
        onValue(dbRef, (snapshot) => {
            snapshot.exists() ? setWatchlistCoinIDs(Object.values(snapshot.val())) : setWatchlistCoinIDs([])
        })
      }, []);


    useEffect(() => {
        renderWatchListCoins(watchlistCoinIDs)
    }, [watchlistCoinIDs])

    function renderWatchListCoins(dbdata){
            setWatchlistCoins(dbdata.map(coinID => {
                const coinData = allCoins.find(coin => coinID === coin.id)
                const newCoin = new WatchlistCoin(coinData) 
                return newCoin
            }))
    }

    const findItemKeyAndRemove = (id) => {
        const itemsRef = ref(db, `/cryptoWorld/sharedPublicWatchlist/`);
        const queryRef = query(itemsRef, orderByValue(), equalTo(id));
        get(queryRef)
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const itemKey = childSnapshot.key;
              const itemRef = ref(db, `/cryptoWorld/sharedPublicWatchlist/${itemKey}`);
              remove(itemRef)
                .then(() => {
                  console.log("Item removed successfully.", itemRef);
                })
            });
          })
          .catch((error) => {
            console.log("Error finding item: ", error);
          });
      }

    function removeFromWatchlist(e){
        const id = e.target.id
        findItemKeyAndRemove(id)
    }

    const columns = [
      {
        title: '',
        key: 'remove',
        dataIndex: 'remove',
        render: (text, record) => (
          <span
            style={{
              textDecoration: 'underline',
              color: 'blue',
              cursor: 'pointer',
            }}
            id={record.id}
            onClick={(event) => removeFromWatchlist(event)}
          >
            <i
              className="fa-solid fa-star"
              style={{
                fontSize: '16px',
                color: 'orange',
                cursor: 'pointer',
                marginBottom: '7px',
              }}
              id={record.id}
            ></i>
          </span>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Space size="middle">
            <img
              src={record.image}
              style={{ minWidth: '25px', maxWidth: '25px' }}
              alt="coin symbol"
            />
            <span>
              {text} ({record.symbol})
            </span>
          </Space>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'currentPrice',
        key: 'currentPrice',
      },
      {
        title: 'Market Cap',
        key: 'mktCap',
        dataIndex: 'mktCap',
      },
      {
        title: 'High 24h',
        key: 'high24h',
        dataIndex: 'high24h',
      },
      {
        title: 'Low 24h',
        key: 'low24h',
        dataIndex: 'low24h',
      },
    ];

    return (
            <Table
              columns={columns}
              dataSource={watchlistCoins}
              title={() => 'Watchlist'}
              scroll={{ x: 'max-content'}}
            />
    );
}
