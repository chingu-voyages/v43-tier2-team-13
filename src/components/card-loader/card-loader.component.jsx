import { Col, Card, Skeleton } from 'antd';

export const CardLoader = () => {
  return (
    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
      <Card bordered={false} className="criclebox ">
        <div style={{ padding: '20px' }}>
          <Skeleton active />
        </div>
      </Card>
    </Col>
  );
};
