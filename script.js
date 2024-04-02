const tileContainerElement = document.querySelector('.tiles-container');
const maxTilesPerRow = 48;
const cellTypes = ['mountain', 'hill', 'plain', 'beach', 'sea'];
let tiles;

function createHtmlElement(x, y) {
  const tileElement = document.createElement('div');
  tileElement.classList.add('tile');
  tileElement.dataset.x = x;
  tileElement.dataset.y = y;
  // tileElement.innerHTML = `${x}, ${y}`;
  return tileElement;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawBeach(tile, x, y) {
  const beachBoundaryMin = randomIntFromInterval(0, 2);
  const beachBoundaryMax = randomIntFromInterval(47, 48);
  if ((y > beachBoundaryMin && x > beachBoundaryMin) && (x < beachBoundaryMax && y < beachBoundaryMax)) {
    tile.cellType = cellTypes[3];
  }
  return tile;
}

function drawPlain(tile, x, y) {
  const plainBoundaryMin = randomIntFromInterval(2, 8);
  const plainBoundaryMax = randomIntFromInterval(45, 47);
  if ((y > plainBoundaryMin && x > plainBoundaryMin) && (x < plainBoundaryMax && y < plainBoundaryMax)) {
    tile.cellType = cellTypes[2];
  }
  return tile;
}

function drawHills(tile, x, y) {
  const hillsBoundaryMin = randomIntFromInterval(8, 12);
  const hillsBoundaryMax = randomIntFromInterval(38, 45);
  if ((y > hillsBoundaryMin && x > hillsBoundaryMin) && (x < hillsBoundaryMax && y < hillsBoundaryMax)) {
    tile.cellType = cellTypes[1];
  }
  return tile;
}

function drawMountains(tile, x, y) {
  const mountainBoundaryMin = randomIntFromInterval(12, 20);
  const mountainBoundaryMax = randomIntFromInterval(29, 38);
  if ((y > mountainBoundaryMin && x > mountainBoundaryMin) && (x < mountainBoundaryMax && y < mountainBoundaryMax)) {
    tile.cellType = cellTypes[0];
  }
  return tile;
}

function drawMap() {
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      let tile = tiles[y][x];
      tile.cellType = cellTypes[4];
      tile = drawBeach(tile, x, y);
      tile = drawPlain(tile, x, y);
      tile = drawHills(tile, x, y);
      tile = drawMountains(tile, x, y);
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
// generateTerrain();
drawMap();
