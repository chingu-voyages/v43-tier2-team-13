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
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
}));

function NewsCard({ selectedCoin }) {
  const [coinNews, setCoinNews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => setWindowWidth(window.innerWidth);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mapData = (news) => {
    return news.map(info => ({
      href: info.url,
      title: truncateWithEllipses(info.title, 55),
      image: info.image || newsImage,
      description: `${info.source.name} - ${new Date(info.publishedAt).toDateString()}`,
      content: truncateWithEllipses(info.description, 40)
    }));
  }
  
  const mappedData = useMemo(() => mapData(coinNews), [coinNews]);

  useEffect(() => {
    getCoinNews(`${selectedCoin.id} ${selectedCoin.symbol}`).then(({ articles }) => {
      setCoinNews(articles);
    }).catch((err) => {
      console.log(err);
    });
  }, [selectedCoin])

  function truncateWithEllipses(text, max) {
    return text.substr(0, max - 1) + (text.length > max ? '...' : '');
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {},
        pageSize: windowWidth < 1200 ? 1 : 2,
      }}
      dataSource={mappedData.length ? mappedData : dataSample}

      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={260}
              height={162}
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