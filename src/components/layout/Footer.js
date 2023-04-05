/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Layout, Row, Col } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons';

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: '#fafafa' }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2023, made with
            {<HeartFilled />} by
            <a href="#pablo" className="font-weight-bold" target="_blank">
              Chingu Team 13
            </a>
            for a better web.
            <a
              href="https://github.com/chingu-voyages/v43-tier2-team-13"
              style={{ cursor: 'pointer', marginLeft: '30px' }}
              target="_blank"
              rel="noreferrer"
            >
              {<GithubOutlined />}
            </a>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
