const getInitialGrid = (totalRows, totalCols) => {
  const items = [];
  for (let row = 0; row < totalRows; row++) {
    const currentRow = [];
    for (let col = 0; col < totalCols; col++) {
      currentRow.push(_getNode(col, row));
    }
    items.push(currentRow);
  }
  
  return items;
}

const _getNode = (col, row) => {
  return {
    col,
    row,
    distance: Infinity,
    previousNode: null,
    isStart: false,
    isFinish: false,
    isVisited: false,
    isWall: false,
    f: 0, // for A* algorithm
    g: 0, // for A* algorithm
    h: 0, // for A* algorithm
    closed: false // for A* algorithm
  };
}

const getNewGridWithStart = (grid, { row, col }) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const getNewGridWithEnd = (grid, { row, col }) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const generateMaze = (grid, totalRows, totalCols) => {
  const nodes = grid.slice();
  const ROWS = parseInt(totalRows);
  const COLS = parseInt(totalCols);
  const maze = generateWalls(ROWS, COLS);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].length; j++) {
      const node = nodes[i][j];
      if (node.isStart || node.isFinish) {
        if (node.row > 0) maze[node.row - 1][node.col] = 0;
        if (node.row < ROWS - 1) maze[node.row + 1][node.col] = 0;
        if (node.col > 0) maze[node.row][node.col - 1] = 0;
        if (node.col < COLS - 1) maze[node.row][node.col + 1] = 0;
      }
    }
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const node = nodes[i][j];
      if (!node.isStart && !node.isFinish && maze[i][j] === 1) {
        node.isWall = true;
      }
    }
  }

  return nodes;
}

function generateWalls(height, width) {
  const EMPTY = 0;
  const WALL = 1;

  const OOB = {};

  if (!width || !height) {
    throw new Error('Missing required `width` & `height` options!');
  }

  const out = new Array(height);
  for (let y = 0; y < out.length; y++) {
    out[y] = new Array(width).fill(WALL);
  }

  function lookup(field, x, y, defaultValue = EMPTY) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return defaultValue;
    }
    return field[y][x];
  }

  const walls = [];
  function makePassage(x, y) {
    out[y][x] = EMPTY;

    const candidates = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
    for (const wall of candidates) {
      if (lookup(out, wall.x, wall.y) === WALL) {
        walls.push(wall);
      }
    }
  }

  // Pick random point and make it a passage
  makePassage(Math.random() * width | 0, Math.random() * height | 0);

  while (walls.length !== 0) {
    const { x, y } = walls.splice((Math.random() * walls.length) | 0, 1)[0];

    const left = lookup(out, x - 1, y, OOB);
    const right = lookup(out, x + 1, y, OOB);
    const top = lookup(out, x, y - 1, OOB);
    const bottom = lookup(out, x, y + 1, OOB);

    if (left === EMPTY && right === WALL) {
      out[y][x] = EMPTY;
      makePassage(x + 1, y);
    } else if (right === EMPTY && left === WALL) {
      out[y][x] = EMPTY;
      makePassage(x - 1, y);
    } else if (top === EMPTY && bottom === WALL) {
      out[y][x] = EMPTY;
      makePassage(x, y + 1);
    } else if (bottom === EMPTY && top === WALL) {
      out[y][x] = EMPTY;
      makePassage(x, y - 1);
    }
  }

  return out;
};

const findNeighbors = (grid, row, col, diagonal) => {
  const neighbors = [];
  if (grid[row] && grid[row][col - 1]) neighbors.push(grid[row][col - 1]); // WEST
  if (grid[row - 1] && grid[row - 1][col]) neighbors.push(grid[row - 1][col]); // NORTH
  if (grid[row] && grid[row][col + 1]) neighbors.push(grid[row][col + 1]); // EAST
  if (grid[row + 1] && grid[row + 1][col]) neighbors.push(grid[row + 1][col]); // SOUTH

  // allow diagonal support
  if (diagonal) {
    if (grid[row - 1] && grid[row - 1][col - 1]) neighbors.push(grid[row - 1][col - 1]); // NORTHWEST
    if (grid[row - 1] && grid[row - 1][col + 1]) neighbors.push(grid[row - 1][col + 1]); // NORTHEAST
    if (grid[row + 1] && grid[row + 1][col + 1]) neighbors.push(grid[row + 1][col + 1]); // SOUTHEAST
    if (grid[row + 1] && grid[row + 1][col - 1]) neighbors.push(grid[row + 1][col - 1]); // SOUTHWEST
  }

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

const getShortestPath = (finish) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finish;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export {
  getInitialGrid,
  getNewGridWithWallToggled,
  getNewGridWithStart,
  getNewGridWithEnd,
  generateMaze,
  findNeighbors,
  getShortestPath,
}