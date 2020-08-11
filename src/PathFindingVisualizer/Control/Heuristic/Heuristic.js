import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';

import './Heuristic.css';

const Heuristic = ({ heuristic, onChange }) => {
  return (
    <Container style={{ marginBottom: 10 }}>
      <FormControl
        as="select"
        size="sm"
        value={heuristic}
        onChange={onChange}
      >
        <option value="manhattan">Manhattan</option>
        <option value="diagonalChebyshev">Chebyshev Distance</option>
        <option value="diagonalOctile">Octile Distance</option>
        <option value="euclidean">Euclidean Distance</option>
        <option value="euclideanSquared">Euclidean (Squared) Distance</option>
      </FormControl>
    </Container>
  )
}

export default Heuristic;