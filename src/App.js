import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <PageHeader>My React Trello App</PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <Card title="Start" lookandfeel="warning" tooltip="Add a new initial task"/>
            </Col>
            <Col xs={12} md={4}>
              <Card title="In Progress" lookandfeel="info" tooltip="Add a task in progress"/>
            </Col>
            <Col xs={12} md={4}>
              <Card title="Finished" lookandfeel="success" tooltip="Add a finished task"/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
