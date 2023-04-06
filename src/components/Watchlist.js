import React, {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import WatchlistCoin from '../watchlistClassConstructor';
import { ref, update, push, get, query, orderByValue, equalTo, remove } from "firebase/database";
import { cryptoWorldDB, db } from '../firebaseConfig';
import { Table, Space } from "antd";

export default function Watchlist(props) {
    const {addToWatchlist, allCoins}  = props
    const [coinToAdd, setCoinToAdd] = useState('')
    const [watchlistCoinIDs, setWatchlistCoinIDs] = useState([])
    const [watchlistCoins, setWatchlistCoins] = useState([])
    const [userUID, setUserUID] = useState();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
          setUserUID(uid);
        } else {
          setUserUID('');
          setWatchlistCoinIDs([])
          // User is signed out
        }
      });
    }, []);

    useEffect(() => {
        if(addToWatchlist){
            setCoinToAdd(addToWatchlist)
        }
        return () => {
            setCoinToAdd('')
        }
    }, [addToWatchlist]);

    useEffect(() => {
        if(coinToAdd !== ''){
            addCoinToDBWatchlist(coinToAdd)
        }
        return () => {
            setCoinToAdd('')
        }
    }, [coinToAdd])

    function updateUserWatchlist(){
        const dbRef = ref(db, `/cryptoWorld/users/${userUID}/watchlist/`)
            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setWatchlistCoinIDs(Object.values(snapshot.val()));
                } else {
                    setWatchlistCoinIDs([]);
                }
              }).catch((error) => {
                console.error(error);
              });
    }

    function addCoinToDBWatchlist(coinID) {
      if (userUID) {
        const itemsRef = ref(db, `/cryptoWorld/users/${userUID}/watchlist/`);
        const queryRef = query(itemsRef, orderByValue(), equalTo(coinID));
        get(queryRef)
          .then((snapshot) => {
            if (snapshot.size === 0) {
              const newPostKey = push(itemsRef).key;
              const updates = {};
              updates[`/users/${userUID}/watchlist/` + newPostKey] = coinID;
              update(cryptoWorldDB, updates);
            } else {
              console.log('Coin already in watchlist');
            }
          })
          .catch((error) => {
            console.log('Error finding item: ', error);
          })
          .then(() => {
            updateUserWatchlist()
            });
      }
    }

    useEffect(() => {
        if(userUID){
            updateUserWatchlist()
        }
        return () => {
            setWatchlistCoinIDs([])
        }
      }, [userUID]);


    useEffect(() => {
        if(allCoins?.length > 1){
            renderWatchListCoins(watchlistCoinIDs)
        }
        return () => {
            setWatchlistCoins([])
        }
    }, [watchlistCoinIDs])

    function renderWatchListCoins(dbdata){
            setWatchlistCoins(dbdata.map(coinID => {
                const coinData = allCoins.find(coin => coinID === coin.id)
                const newCoin = new WatchlistCoin(coinData) 
                return newCoin
            }))
    }

    const findItemKeyAndRemove = (id) => {
        const itemsRef = ref(db, `/cryptoWorld/users/${userUID}/watchlist/`);
        const queryRef = query(itemsRef, orderByValue(), equalTo(id));
        get(queryRef)
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const itemKey = childSnapshot.key;
              const itemRef = ref(db, `/cryptoWorld/users/${userUID}/watchlist/${itemKey}`);
              remove(itemRef)
                .then(() => {
                  console.log("Item removed successfully.", itemRef);
                  setWatchlistCoinIDs(watchlistCoinIDs.filter(coinID => coinID !== id))
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
        width: '100px',
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
        width: '320px',
        render: (text, record) => (
          <Space size="small">
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
      <div>
        {userUID && watchlistCoinIDs.length > 0 ? (
          <Table
              columns={columns}
              dataSource={watchlistCoins}
              title={() => 'Watchlist'}
              scroll={{ x: 'max-content'}}
            />
        ) : null}
      </div>
    );
}
