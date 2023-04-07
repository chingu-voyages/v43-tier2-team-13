import { List } from 'antd';
import { getCoinNews } from '../../api/api';
import React, { useEffect, useMemo, useState } from 'react';
import newsImage from '../../assets/images/newsImage.png'

const dataSample = Array.from({
  length: 24,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `Random Crypto News ${i+1}`,
  image: newsImage,
  description:
    `News Source - ${new Date().toDateString()}`,
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

function NewsCard({ selectedCoin }) {
  const [coinNews, setCoinNews] = useState([]);

  const mapData = (news) => {
    console.log('Memo Ran:', news[0]);
    return news.map(info => ({
      href: info.url,
      title: info.title,
      image: info.image || newsImage,
      description: `${info.source.name} - ${new Date(info.publishedAt).toDateString()}`,
      content: info.description
    }));
  }
  
  const mappedData = useMemo(() => mapData(coinNews), [coinNews]);
  console.log('Data: ', mappedData);

  useEffect(() => {
    console.log("Effect Run:", selectedCoin.id);
    getCoinNews(`${selectedCoin.id} ${selectedCoin.symbol}`).then(({ articles }) => {
      setCoinNews(articles);
    }).catch((err) => {
      console.log(err);
    });
  }, [selectedCoin])


  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 2,
      }}
      dataSource={mappedData.length ? mappedData : dataSample}

      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={272}
              alt="news representation"
              src={item.image}
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.href} target='_blank' rel="noreferrer">{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}
export default NewsCard;