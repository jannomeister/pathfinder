import React from 'react';

import './Node.css';

const Node = props => {
  const {
    row,
    col,
    isStart,
    isFinish,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onClick,
  } = props;

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`grid-item ${extraClassName}`}
      // onMouseDown={() => onMouseDown(row, col)}
      // onMouseEnter={() => onMouseEnter(row, col)}
      // onMouseUp={onMouseUp}
      onClick={() => onClick(row, col)}>
      { isStart && <img src={require("../../assets/start.png")} width={15} height={15} /> }
      { isFinish && <img src={require("../../assets/finish.png")} width={15} height={15} /> }
    </div>
  )
}

Node.defaultProps = {
  row: 0,
  col: 0,
}

export default Node;  
