import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Legend.css';

const Legend = () => (
  <Container style={{ marginBottom: 10, borderBottom: '1px solid grey', paddingBottom: 10 }}>
    <Row style={{ marginBottom: 5 }}>
      <Col xs={6}>
        <img src={require("../../../assets/start.png")} style={{ marginRight: 2 }} alt="" width={20} height={20} />
        <span>Starting Node</span>
      </Col>
      <Col xs={6}>
        <img src={require("../../../assets/finish.png")} style={{ marginRight: 2 }} alt="" width={20} height={20} />
        <span>Finish Node</span>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <div style={{ width: 20, height: 20, marginRight: 3, backgroundColor: '#364F6B', display: 'inline-block', verticalAlign: 'sub' }}></div>
        <span>Wall Node</span>
      </Col>
      <Col xs={6}>
        <div style={{ width: 19, height: 19, marginRight: 3, outline: '1px solid #3FC1C9', display: 'inline-block', verticalAlign: 'sub' }}></div>
        <span>Path Node</span>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <div style={{ width: 20, height: 20, marginRight: 3, backgroundColor: 'rgba(0, 190, 218, 0.75)', display: 'inline-block', verticalAlign: 'sub' }}></div>
        <span>Visited Node</span>
      </Col>
      <Col xs={6}>
        <div style={{ width: 20, height: 20, marginRight: 3, backgroundColor: '#FC5185', display: 'inline-block', verticalAlign: 'sub' }}></div>
        <span>Shortest Path</span>
      </Col>
    </Row>
  </Container>
)

export default Legend