import { findNeighbors } from '../config';

const breadthFirstSearch = (grid, start, finish) => {
  const visited = [start];
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    const destinations = findNeighbors(grid, node.row, node.col);
    for (const destination of destinations) {
      if (destination === finish) {
        destination.isVisited = true;
        destination.previousNode = node;
        visited.push(destination)
        return visited;
      }

      if (!destination.isVisited && !destination.isWall) {
        destination.isVisited = true;
        visited.push(destination);
        queue.push(destination);

        if (destination !== start) {
          destination.previousNode = node;
        }
      }
    }
  }
}

export {
  breadthFirstSearch,
}