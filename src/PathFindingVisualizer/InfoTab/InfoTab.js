import React, { useState } from 'react';
import Heuristic from './Heuristic/Heuristic';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
// import Button from '@material-ui/core/Button';

import './InfoTab.css';

const InfoTab = ({ start, finish, hasMaze, visualize, generateMaze, reset }) => {
  const [heuristic, setHeuristic] = useState("manhattan");
  const [algorithm, setAlgorithm] = useState("");
  const canVisualize = !start || !finish ? true : false;
  const canGenerate = !start || !finish ? true : false;

  const onVisualize = e => {
    e.preventDefault();
    if (algorithm) {
      visualize(algorithm, heuristic);
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

export default InfoTab;