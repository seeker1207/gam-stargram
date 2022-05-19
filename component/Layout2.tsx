import React from 'react';
import { Row, Col, Button } from 'antd';

const style = { background: '#5829bb', borderColor: '#5829bb', borderRadius: '5px' };
const colStyle = { textAlign: 'center', padding: '5px', background: 'violet' };

function Layout2() {
  return (
    <Row>
      <Col span={6} style={colStyle}>나눈 영역</Col>
      <Col span={6} style={colStyle}>나눈 영역</Col>
      <Col span={6} style={colStyle}>나눈 영역</Col>
      <Col span={6} style={colStyle}>
        <Button type="primary" style={style} size="large">로그인</Button>
      </Col>
    </Row>
  );
}

export default Layout2;
