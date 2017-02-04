function HexagonalTiling(r) {
  this.polys = [];

  this.BuildCell = function(x, y) {
    var p = new Polygon();

    // rotate 360 degrees around the clock in 60 degree increments
    var sides = 6;
    var inc = (2 * Math.PI) / sides;
    for (var index = 0; index < sides; index++){
      // angular to cartesian
      var θ = (index * inc) - inc / 2;
      var vX = x + r * Math.cos(θ);
      var vY = y + r * Math.sin(θ);
      p.addVertex(vX, vY);
    }
    p.close();
    this.polys.push(p);
  }

  //http://www.redblobgames.com/grids/hexagons/
  this.BuildGrid = function() {
    var h = r*2;
    var w = (Math.sqrt(3)/2) * h;
    var hInc = 3 * (h / 4);
    // TODO: get dimensions from somewhere
    var row = 0;
    for (var y = h/2; y < height; y += hInc) {
      var startX = ((row % 2) == 0) ? w : w/2;
      for (var x = startX; x < width; x += w) {
        this.BuildCell(x, y);
      }
      row ++;
    }

  }

}
