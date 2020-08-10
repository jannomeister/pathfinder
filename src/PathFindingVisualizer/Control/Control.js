import React, { useState } from 'react';
import DiagonalOption from './DiagonalOption/DiagonalOption';
import Heuristic from './Heuristic/Heuristic';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
// import Button from '@material-ui/core/Button';

import './Control.css';

const Control = ({ start, finish, hasMaze, visualize, generateMaze, reset }) => {
  const [algorithm, setAlgorithm] = useState("");
  const [heuristic, setHeuristic] = useState("manhattan");
  const [isDiagonal, setIsDiagonal] = useState(false);
  const canVisualize = !start || !finish ? true : false;
  const canGenerate = !start || !finish ? true : false;

  const onVisualize = e => {
    e.preventDefault();
    if (algorithm) {
      visualize(algorithm, heuristic, isDiagonal);
    }
  }

  return (
    <Grid item xs={12}>
      <div>
        { !algorithm && <Alert severity="warning">Please select an algorithm</Alert> }
        <form>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
            <option value="">none</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">A star</option>
            <option value="BFS">Breadth First Search</option>
          </select>

          <button disabled={canVisualize} onClick={onVisualize}>Visualize</button>

          {algorithm === "astar" && (
            <DiagonalOption isDiagonal={isDiagonal} onChange={e => setIsDiagonal(e.target.checked)} />
          )}

          {algorithm === "astar" && (
            <Heuristic heuristic={heuristic} onChange={e => setHeuristic(e.target.value)} />
          )}
        </form>
      </div>
      <div>
        <button disabled={canGenerate} onClick={generateMaze}>Generate Maze</button>
        <button
          onClick={() => {
            setAlgorithm("");
            reset();
          }}
        >Reset</button>
      </div>
    </Grid>
  )
}

export default Control;