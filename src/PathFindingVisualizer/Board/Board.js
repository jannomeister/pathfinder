import React from 'react';
import Node from '../Node/Node';

import Grid from '@material-ui/core/Grid';

import './Board.css';

const Board = ({ nodes, onClick }) => {
  return (
    <Grid item xs={12}>
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          {nodes.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map(({isStart, isFinish, isWall}, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={rowIdx}
                  col={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  onClick={onClick}
                  // onClick={(row, col) => onClick(row, col)}
                  // onMouseDown={(row, col) => onMouseDown(row, col)}
                  // onMouseEnter={(row, col) => onMouseEnter(row, col)}
                  // onMouseUp={onMouseUp}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Grid>
  )
}

export default Board;