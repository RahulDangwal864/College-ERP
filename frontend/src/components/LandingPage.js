import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LandingPageImage from '../assets/LandingPage.png';

function LandingPage() {
  return (
    <Container className="my-5 landing-page-container">
      <Row className="align-items-center">
        <Col md={6}>
          <Image src={LandingPageImage} alt="College ERP" className="img-fluid" rounded />
        </Col>
        <Col md={6} className="text-center">
          <div className="landing-page-content m-4">
            <h1 className="landing-page-title">Welcome to College ERP System</h1>
            <p className="landing-page-description">A comprehensive solution for managing college operations</p>
            <Link to="/admin-faculty/login">
              <Button variant="success" size='lg' className="m-2 landing-page-button">Login as Admin/Faculty</Button>
            </Link>
            <Link to="/student/login">
              <Button variant="secondary" size='lg' className="m-2 landing-page-button">Login as Student</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
