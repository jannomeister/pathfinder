import React, { useState, useEffect } from 'react';
import Board from './Board/Board';
import Control from './Control/Control';
import { getInitialGrid, getNewGridWithStart, getNewGridWithEnd, getNewGridWithWallToggled, generateMaze, getShortestPath } from '../config';
import { dijkstra } from '../algorithms/dijkstra';
import { breadthFirstSearch } from '../algorithms/breadthFirstSearch';
import { depthFirstSearchSearch } from '../algorithms/depthFirstSearch';
import { aStar } from '../algorithms/aStar';

import './PathFindingVisualizer.css';

// material
// import Grid from '@material-ui/core/Grid';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DEFAULT_ROWS = 35;
const DEFAULT_COLS = 35;

const PathFindingVisualizer = props => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [hasMaze, setHasMaze] = useState(false);

  useEffect(() => {
    setNodes(getInitialGrid(DEFAULT_ROWS, DEFAULT_COLS))
  }, []);

  const onClick = (row, col) => {
    if (!startNode && !endNode) {
      setStartNode({ row, col });
      const newGrid = getNewGridWithStart(nodes, { row, col });
      setNodes(newGrid);
    } else if (startNode && !endNode) {
      setEndNode({ row, col });
      const newGrid = getNewGridWithEnd(nodes, { row, col });
      setNodes(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(nodes, row, col);
      setHasMaze(true);
      setNodes(newGrid);
    }
  }
  
  const visualizeBFS = () => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const data = breadthFirstSearch(nodes, start, finish);
    const newNodes = nodes.slice();
    const shortestPathData = getShortestPath(finish)

    for (let i = 0; i < data.length; i++) {
      setTimeout(() => {
        const node = data[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-visited";

        if (i === data.length - 1) {
          for (let j = 0; j < shortestPathData.length; j++) {
            setTimeout(() => {
              const node = shortestPathData[j];
              document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-shortest-path";
            }, 10 * j)
          }
        }
      }, 10 * i);
    }

    setNodes(newNodes);
  }

  const visualizeDFS = () => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const data = depthFirstSearchSearch(nodes, start, finish);
    const newNodes = nodes.slice();
    const shortestPathData = getShortestPath(finish)

    for (let i = 0; i < data.length; i++) {
      setTimeout(() => {
        const node = data[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-visited";

        if (i === data.length - 1) {
          for (let j = 0; j < shortestPathData.length; j++) {
            setTimeout(() => {
              const node = shortestPathData[j];
              document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-shortest-path";
            }, 10 * j)
          }
        }
      }, 10 * i);
    }

    setNodes(newNodes);
  }

  const visualizeDijkstra = () => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const visitedNodesInOrder = dijkstra(nodes, start, finish);
    const nodesInShortestPathOrder = getShortestPath(finish);

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          // animate shortest path
          for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
              const node = nodesInShortestPathOrder[i];
              document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-shortest-path";
            }, 50 * i)
          }
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-visited";
      }, 10 * i);
    }
  };

  const visualizeAStar = (heuristic, isDiagonal) => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const data = aStar(nodes, start, finish, heuristic, isDiagonal);
    const newNodes = nodes.slice();
    const shortestPathData = getShortestPath(finish);
    for (let i = 0; i < data.length; i++) {
      setTimeout(() => {
        const node = data[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-visited";

        if (i === data.length - 1) {
          for (let j = 0; j < shortestPathData.length; j++) {
            setTimeout(() => {
              const node = shortestPathData[j];
              document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-shortest-path";
            }, 100 * j)
          }
        }
      }, 100 * i);
    }

    setNodes(newNodes);
  }

  const onVisualize = (algorithm, heuristic, isDiagonal) => {
    if (algorithm === "dijkstra") {
      visualizeDijkstra()
    } else if (algorithm === "astar") {
      visualizeAStar(heuristic, isDiagonal);
    } else if (algorithm === "BFS") {
      visualizeBFS();
    } else if (algorithm === "DFS") {
      visualizeDFS();
    }
  }

  const onGenerateMaze = () => {
    const newGrid = generateMaze(nodes, rows, cols);
    setHasMaze(!hasMaze);
    setNodes(newGrid);
  }

  const onClearPath = () => {
    
    const newGrid = nodes.slice();

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        const node = newGrid[i][j];
        node.isWall = false;
        node.isVisited = false;
        document.getElementById(`node-${i}-${j}`).classList.remove("node-visited");
        document.getElementById(`node-${i}-${j}`).classList.remove("node-shortest-path");
      }
    }

    setHasMaze(!hasMaze);
    setNodes(newGrid);
  }

  const onReset = () => {
    setRows(DEFAULT_ROWS);
    setCols(DEFAULT_COLS);
    setStartNode(null);
    setEndNode(null);
    setHasMaze(false);
    setNodes(getInitialGrid(DEFAULT_ROWS, DEFAULT_COLS))

    // remove the embedded css classes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        document.getElementById(`node-${i}-${j}`).classList.remove("node-visited");
        document.getElementById(`node-${i}-${j}`).classList.remove("node-shortest-path");
      }
    }
  }

  return (
    <Container fluid style={{ maxWidth: 1200 }}>
      <Row>
        <Col xs={8}>
          <Board nodes={nodes} onClick={onClick} />
        </Col>
        <Col xs={4}>
          <Control
            start={startNode}
            finish={endNode}
            hasMaze={hasMaze}
            visualize={onVisualize}
            generateMaze={onGenerateMaze}
            clearPath={onClearPath}
            reset={onReset}
          /> 
        </Col>
      </Row>
    </Container>
  )
}

export default PathFindingVisualizer;