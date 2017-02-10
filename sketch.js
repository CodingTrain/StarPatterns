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
var angleSliderIncrease;
var deltaSliderIncrease;
var cycleSlider;
var downloadButton;
var tilingTypeSelect;
var gridCheck;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvasContainer');

  // angleMode(DEGREES);
  background(51);
  deltaSlider = select('#delta');
  angleSlider = select('#angle');
  tilingTypeSelect = select('#tiling');
  tilingTypeSelect.changed(chooseTiling);
  gridCheck = select('#showGrid');
  angleSliderIncrease = select('#angleIncrease');
  deltaSliderIncrease = select('#deltaIncrease');
  cycleSlider = select('#cycleIncrease');
  downloadButton = createButton('save');
  downloadButton.mousePressed(saveDrawing);
  chooseTiling();
}

function draw() {
  background(50);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  var t = 0;
  var step = cycleSlider.value() / polys.length;
  for (var i = 0; i < polys.length; i++) {
    angle += (Math.sin(step * i)) * angleSliderIncrease.value();
    delta += (Math.sin(step * i)) * deltaSliderIncrease.value();
    polys[i].hankin();
    polys[i].show();
  }
}

function octSquareTiling() {
  var octSqTiles = new SquareOctagonTiling(50);
  octSqTiles.buildGrid();
  polys = octSqTiles.polys;
}

function hexTiling() {
  var hexTiles = new HexagonalTiling(50);
  hexTiles.buildGrid();
  polys = hexTiles.polys;
}

function hexTriangleSquareTiling() {
  var tiles = new HexaTriangleSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}

function squareTiling() {
  polys = [];
  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function dodecaHexSquareTiling() {
  var tiles = new DodecaHexaSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;

}

function chooseTiling() {
  switch (tilingTypeSelect.value()) {
    case "4.8.8":
      octSquareTiling();
      break;
    case "square":
      squareTiling();
      break;
    case "hexagonal":
      hexTiling();
      break;
    case "dodeca_hex_square":
      dodecaHexSquareTiling();
      break;
    case "hexa_triangle_square":
      // dodecaHexSquareTiling();
      hexTriangleSquareTiling();
      break;
    default:
      hexTriangleSquareTiling();
      // dodecaHexSquareTiling();
      // squareTiling();
      break;
  }
}

function printPoints() {
  var data = {
    a: 1,
    b: 2,
    c: 3
  };
  var json = JSON.stringify(data);
  var blob = new Blob([json], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.download = "backup.json";
  a.href = url;
  a.textContent = "Download backup.json";
  var points = [];

  polys.forEach(function(poly) {
    poly.edges.forEach(function(edge) {
      points.push(edge.h1.a);
      points.push(edge.h1.end);
      points.push(edge.h2.a);
      points.push(edge.h2.end);
    });
  });

  var pointList = points.map(function(point) {
    return [point.x, point.y];
  });

  return (JSON.stringify(pointList));
}

var link;

function saveDrawing() {
  var json = printPoints();
  var blob = new Blob([json], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);
  if (link) {
    link.parentNode.removeChild(link);
  }
  var a = document.createElement('a');
  a.download = "drawing.json";
  a.href = url;
  a.textContent = "Download drawing.json";
  link = a;
  document.body.appendChild(a);
}
