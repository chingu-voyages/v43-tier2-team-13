import { Layout, Row, Col } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons';
import './Footer.css';

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: '#fafafa' }}>
      <Row className="just">
        <Col xs={24} md={24} lg={24}>
          <div
            className="copyright copyright-content"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            © 2023, made with
            {<HeartFilled />} by
            <a href="#pablo" className="font-weight-bold" target="_blank">
              Chingu Team 13
            </a>
            for a better web.
            <a
              href="https://github.com/chingu-voyages/v43-tier2-team-13"
              style={{
                cursor: 'pointer',
                marginLeft: 'auto',
                marginRight: '20px',
              }}
              target="_blank"
              rel="noreferrer"
            >
              {<GithubOutlined style={{ fontSize: '18px' }} />}
            </a>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
