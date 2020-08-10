import React, { useState, useEffect } from 'react';
import Board from './Board/Board';
import InfoTab from './InfoTab/InfoTab';
import { getInitialGrid, getNewGridWithStart, getNewGridWithEnd, getNewGridWithWallToggled, generateMaze, getShortestPath } from '../config';
import { dijkstra } from '../algorithms/dijkstra';
import { breadthFirstSearch } from '../algorithms/breadthFirstSearch';
import { aStar } from '../algorithms/aStar';

import './PathFindingVisualizer.css';

// material
import Grid from '@material-ui/core/Grid';

const DEFAULT_ROWS = 30;
const DEFAULT_COLS = 30;

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

  const visualizeAStar = (heuristic) => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const data = aStar(nodes, start, finish, heuristic);
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

  const onVisualize = (algorithm, heuristic) => {
    if (algorithm === "dijkstra") {
      visualizeDijkstra()
    } else if (algorithm === "astar") {
      visualizeAStar(heuristic);
    } else if (algorithm === "BFS") {
      visualizeBFS();
    }
  }

  const onGenerateMaze = () => {
    const newGrid = generateMaze(nodes, rows, cols);
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
    <div style={{ maxWidth: '1000px', margin: '10px auto' }}>
      <Grid container spacing={1} style={{ minWidth: '70%',  }}>
        <Grid container item xs={8}>
          <Board nodes={nodes} onClick={onClick} />
        </Grid>
        <Grid container item xs={4}>
          <InfoTab
            start={startNode}
            finish={endNode}
            hasMaze={hasMaze}
            visualize={onVisualize}
            generateMaze={onGenerateMaze}
            reset={onReset}
          /> 
        </Grid>
      </Grid>
    </div>
  )
}

export default PathFindingVisualizer;