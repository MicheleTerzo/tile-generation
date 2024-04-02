const tileContainerElement = document.querySelector('.tiles-container');
const maxTilesPerRow = 48;
const cellTypes = ['mountain', 'hill', 'plain', 'sea'];
let tiles;

function createHtmlElement(x, y) {
  const tileElement = document.createElement('div');
  tileElement.classList.add('tile');
  tileElement.dataset.x = x;
  tileElement.dataset.y = y;
  // tileElement.innerHTML = `${x}, ${y}`;
  return tileElement;
}

function generateRandomType() {
  const x = Math.random();
  if (x < 0.3) {
    return cellTypes[0];
  }
  else if (x < 0.8) {
    return cellTypes[1];
  }
  else if (x < 0.95) {
    return cellTypes[2];
  }
  else {
    return cellTypes[3];
  }
}

function equalSplit(firstType, secondType) {
  return Math.random() < 0.5 ? firstType : secondType;
}

const terrainTransitions = {
  'mountain': {
    'mountain': ['hill', 'mountain'], 'hill': ['hill', 'mountain'], 'plain': ['hill', 'plain'], 'sea': ['plain', 'sea']
  }, 'hill': {
    'mountain': ['hill', 'mountain'], 'hill': ['hill', 'plain'], 'plain': ['hill', 'plain'], 'sea': ['plain', 'sea']
  }, 'plain': {
    'mountain': ['hill', 'plain'], 'hill': ['hill', 'mountain'], 'plain': ['plain', 'sea'], 'sea': ['plain', 'sea']
  }, 'sea': {
    'mountain': ['plain', 'sea'], 'hill': ['hill', 'mountain'], 'plain': ['hill', 'plain'], 'sea': ['hill', 'plain']
  }
};

function getTerrainType(previous, top) {
  const types = terrainTransitions[previous ?? top][top ?? previous];
  return types ? equalSplit(...types) : previous;
}

function findAdjacent(x, y) {
  const top = y > 0 ? tiles[y - 1][x] : null;
  const left = x > 0 ? tiles[y][x - 1] : null;
  return {top, left};
}

function generateTerrain() {
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      const tile = tiles[y][x];
      const {top, left} = findAdjacent(x, y);
      if (!left && !top) {
        tile.cellType = generateRandomType();
      }
      else {
        tile.cellType = getTerrainType(left?.cellType, top?.cellType);
      }
      requestAnimationFrame(() => {
        tile.htmlElement.dataset.cellType = tile.cellType;
        tile.htmlElement.classList.add(tile.cellType);
      });
    }
  }
}

function generateGrid() {
  tiles = Array(maxTilesPerRow).fill().map(() => Array(maxTilesPerRow).fill(null));
  const fragment = document.createDocumentFragment();
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      const htmlElement = createHtmlElement(x, y);
      tiles[y][x] = {x, y, htmlElement, cellType: null};
      fragment.appendChild(htmlElement);
    }
  }
  requestAnimationFrame(() => tileContainerElement.appendChild(fragment));
}

generateGrid();
generateTerrain();
