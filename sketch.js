// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// var poly;
var polys = [];

var angle = 75;
var delta = 10;

var deltaSlider;
var angleSlider;
var tilingTypeSelect;

function setup() {
  createCanvas(400, 400);
  //angleMode(DEGREES);
  background(51);
  deltaSlider = createSlider(0, 25, 10);
  angleSlider = createSlider(0, 90, 75);
  tilingTypeSelect = createSelect();
  tilingTypeSelect.option('square');
  tilingTypeSelect.option('hexagonal');
  tilingTypeSelect.changed(chooseTiling);

  chooseTiling();

}

function draw() {
  background(51);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
}

function hexTiling() {
  var hexTiles = new HexagonalTiling(50);
  hexTiles.BuildGrid();
  polys = hexTiles.polys;
}

function squareTiling() {
  polys = [];
  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function chooseTiling() {
  switch (tilingTypeSelect.value()) {
    case "square":
      squareTiling();
      break;
    case "hexagonal":
      hexTiling();
      break;
    default:
      squareTiling();
      break;
  }
}
