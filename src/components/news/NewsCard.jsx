import { List } from 'antd';
import { getCoinNews } from '../../api/api';
import React, { useEffect, useState } from 'react';
import newsImage from '../../assets/images/newsImage.png'

const dataSample = Array.from({
  length: 23,
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
  const [data, setData] = useState([]);

  const mapData = () => {
    const mappedData = coinNews.map(info => ({
      href: info.url,
      title: info.title,
      image: info.image,
      description: `${info.source.name} - ${new Date(info.publishedAt).toDateString()}`,
      content: info.description
    }));
    setData(mappedData);
  }

  useEffect(() => {
    getCoinNews(selectedCoin.id).then((res) => {
      const { articles } = res;
      setCoinNews(articles);
      mapData();
    }).catch((err) => {
      console.log(err);
      setData(dataSample);
    });
    console.log(data, selectedCoin);
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
      dataSource={data}

      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={272}
              alt="news image"
              src={item.image}
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.href} target='_blank'>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}
export default NewsCard;

//https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png