// Home.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Home.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

function Home() {
  const features = [
    { title: 'Campus Life', desc: 'Experience innovation daily', icon: 'bi-building' },
    { title: 'Courses', desc: 'Explore our wide range of programs', icon: 'bi-journal-bookmark' },
    { title: 'Admission', desc: 'Join our community of innovators', icon: 'bi-pencil-square' },
    { title: 'Library', desc: 'Access knowledge and resources', icon: 'bi-book' },
  ];

  return (
    <>
      

      <motion.div
        className="hero-section text-white d-flex flex-column justify-content-center align-items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="display-4 text-dark fw-bold pt-3">Chaitanya Engineering College</h1>
        <p className="lead text-dark">Shaping Tomorrow’s Innovation</p>
      </motion.div>

      <Container className="my-5">
        <Row className="g-4">
          {features.map((item, idx) => (
            <Col key={idx} md={3}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={idx}
              >
                <Card className="text-center shadow hover-shadow transition">
                  <Card.Body>
                    <i className={`bi ${item.icon} display-6 text-primary`}></i>
                    <Card.Title className="mt-2">{item.title}</Card.Title>
                    <Card.Text>{item.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
}

export default Home;
