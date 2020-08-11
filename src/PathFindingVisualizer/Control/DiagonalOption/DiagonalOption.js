import React from 'react';
import Form from 'react-bootstrap/Form';

import './DiagonalOption.css';

const DiagonalOption = ({ isDiagonal, onChange }) => {
  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check
        type="checkbox"
        checked={isDiagonal} 
        onChange={onChange}
        label="Enable Diagonal Search"
      />
    </Form.Group>
  )
}

export default DiagonalOption;
