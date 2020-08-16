import { findNeighbors } from '../config';

const depthFirstSearchSearch = (grid, start, finish, visited = []) => {
  if (start === finish) {
    visited.push(finish);
    finish.isVisited = true
    return visited;
  }

  visited.push(start);
  start.isVisited = true;

  const neighbors = findNeighbors(grid, start.row, start.col);
  for (const neighbor of neighbors) {
    if (neighbor.isWall) continue;
 
    neighbor.previousNode = start;
    if (depthFirstSearchSearch(grid, neighbor, finish, visited)) return visited;
  }

  return false;
}

export {
  depthFirstSearchSearch,
}