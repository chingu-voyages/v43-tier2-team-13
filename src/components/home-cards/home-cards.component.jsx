import { Card, Row, Col, Typography } from 'antd';

export const HomeCards = ({ cardsData }) => {
  const { Title } = Typography;
  return (
    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
      <Card bordered={false} className="criclebox ">
        <div className="number">
          <Row align="middle" gutter={[24, 0]}>
            <Col xs={18}>
              <span>{cardsData.title}</span>
              <Title level={5} style={{ fontSize: '14px' }}>
                {cardsData.value}
                <small className="bnb2" style={{ paddingLeft: '4px' }}>
                  {' '}
                  {cardsData.percentage}
                </small>
              </Title>
            </Col>
            <Col xs={6}>
              <div
                className="icon-box"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {cardsData.logo}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
};
