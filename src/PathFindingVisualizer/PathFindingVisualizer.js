import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { getInitialGrid, getNewGridWithStart, getNewGridWithEnd, getNewGridWithWallToggled, generateMaze } from '../config';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import './PathFindingVisualizer.css';

const DEFAULT_ROWS = 30;
const DEFAULT_COLS = 30;

const PathFindingVisualizer = props => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [hasMaze, setHasMaze] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    setNodes(getInitialGrid(DEFAULT_ROWS, DEFAULT_COLS))
  }, [DEFAULT_COLS, DEFAULT_COLS]);

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
      // const newGrid = getNewGridWithWallToggled(nodes, row, col);
      // setNodes(newGrid);
    }
  }

  // const onMouseDown = (row, col) => {
  //   if (!mouseIsPressed && (!startNode || !endNode)) {
  //     return;
  //   }

  //   const newGrid = getNewGridWithWallToggled(nodes, row, col);
  //   setNodes(newGrid);
  //   setMouseIsPressed(true);
  // }

  // const onMouseEnter = (row, col) => {
  //   if (!mouseIsPressed && (!startNode || !endNode)) {
  //     return;
  //   }

  //   const newGrid = getNewGridWithWallToggled(nodes, row, col);
  //   setNodes(newGrid);
  // }

  // const onMouseUp = () => {
  //   if (!startNode || !endNode) {
  //     return;
  //   }

  //   setMouseIsPressed(false);
  // }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-shortest-path";
      }, 50 * i)
    }
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "grid-item node-visited";
      }, 10 * i);
    }
  }

  const visualizeDijkstra = () => {
    const start = nodes[startNode.row][startNode.col];
    const finish = nodes[endNode.row][endNode.col];
    const visitedNodesInOrder = dijkstra(nodes, start, finish);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const onGenerateNode = (e) => {
    e.preventDefault();
    setStartNode(null);
    setEndNode(null);
    setHasMaze(false);
    setNodes(getInitialGrid(rows, cols));
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
    <div>
      <button disabled={(!startNode || !endNode || !hasMaze) ? true : false} onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>

      <button disabled={(!startNode || !endNode) ? true : false} onClick={onGenerateMaze}>
        Generate Maze
      </button>

      <button onClick={onReset}>
        Reset
      </button>

      <div>
        <p>Start Node: {startNode && `${startNode.row}, ${startNode.col}`}</p>
        <p>End Node: {endNode && `${endNode.row}, ${endNode.col}`}</p>
      </div>
      <form>
        <span>TOTAL ROWS</span>
        <input type="text" value={rows} onChange={e => setRows(e.target.value)} />
        <span>TOTAL COLS</span>
        <input type="text" value={cols} onChange={e => setCols(e.target.value)} />
        <button disabled={(!startNode || !endNode) ? false : true} onClick={e => onGenerateNode(e)}>GENERATE NODE</button>
      </form>
      <div className="grid-container">
        {nodes.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {isStart, isFinish, isWall} = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={rowIdx}
                    col={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    onClick={(row, col) => onClick(row, col)}
                    // onMouseDown={(row, col) => onMouseDown(row, col)}
                    // onMouseEnter={(row, col) => onMouseEnter(row, col)}
                    // onMouseUp={onMouseUp}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PathFindingVisualizer;