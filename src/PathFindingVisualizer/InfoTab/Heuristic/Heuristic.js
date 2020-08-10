import React from 'react';

import './Heuristic.css';

const Heuristic = ({ heuristic, onChange }) => {
  return (
    <div className="container">
      <div>
        <label>
          <input
            type="radio"
            value="manhattan"
            checked={heuristic === "manhattan"}
            onChange={onChange}
          />
          Manhattan Distance
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="diagonalChebyshev"
            checked={heuristic === "diagonalChebyshev"}
            onChange={onChange}
          />
          Chebyshev Distance
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="diagonalOctile"
            checked={heuristic === "diagonalOctile"}
            onChange={onChange}
          />
          Octile Distance
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="euclidean"
            checked={heuristic === "euclidean"}
            onChange={onChange}
          />
          Euclidean Distance
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="euclideanSquared"
            checked={heuristic === "euclideanSquared"}
            onChange={onChange}
          />
          Euclidean (Squared) Distance
        </label>
      </div>
    </div>
  )
}

export default Heuristic;