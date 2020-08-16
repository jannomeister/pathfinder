import React, { useState } from 'react';
import Legend from './Legend/Legend';
import DiagonalOption from './DiagonalOption/DiagonalOption';
import Heuristic from './Heuristic/Heuristic';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './Control.css';

const Control = ({ start, finish, hasMaze, visualize, generateMaze, clearPath, reset }) => {
  const [algorithm, setAlgorithm] = useState("");
  const [heuristic, setHeuristic] = useState("manhattan");
  const [isDiagonal, setIsDiagonal] = useState(false);
  const canVisualize = !start || !finish ? true : false;
  const canGenerate = hasMaze || !start || !finish ? false : true;

  const onVisualize = e => {
    e.preventDefault();
    if (algorithm) {
      visualize(algorithm, heuristic, isDiagonal);
    }
  }

  return (
    <div style={{ padding: 10 }}>
      <Legend />

      <Form>
        <ButtonGroup style={{ marginBottom: 10 }}>
          <Button variant="outline-secondary" disabled={!canGenerate} onClick={generateMaze}>
            Generate Maze
          </Button>
          <Button variant="outline-secondary" disabled={!hasMaze} onClick={clearPath}>
            Clear Path
          </Button>
          <Button variant="outline-secondary"
            onClick={() => {
              setAlgorithm("");
              setHeuristic("manhattan");
              setIsDiagonal(false);
              reset(); 
            }}
          >
            Reset
          </Button>
        </ButtonGroup>

        <Container style={{ marginBottom: 10 }}>
          <FormControl
            as="select"
            size="sm"
            value={algorithm}
            onChange={e => setAlgorithm(e.target.value)}
          >
            <option value="">Select Algorithm</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">A star</option>
            <option value="BFS">Breadth First Search</option>
            <option value="DFS">Depth First Search</option>
          </FormControl>
        </Container>

        {algorithm === "astar" && (
          <Heuristic heuristic={heuristic} onChange={e => setHeuristic(e.target.value)} />
        )}

        {algorithm === "astar" && (
          <DiagonalOption isDiagonal={isDiagonal} onChange={e => setIsDiagonal(e.target.checked)} />
        )}

        <Button variant="outline-success" disabled={canVisualize} onClick={onVisualize}>
          Visualize
        </Button>
      </Form>
    </div>
  )
}

export default Control;