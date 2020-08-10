import React from 'react';

import './DiagonalOption.css';

const DiagonalOption = ({ isDiagonal, onChange }) => {
  return (
    <div className="container">
      <label>
        <input
          name="isDiagonal"
          type="checkbox"
          checked={isDiagonal}
          onChange={onChange}
        />
        Enable Diagonal Search?
      </label>
    </div>
  )
}

export default DiagonalOption;
