function HexagonalTiling(r) {
  this.polys = [];

  this.BuildCell = function(x, y) {
    var p = new Polygon();

    // rotate 360 degrees around the clock in 60 degree increments
    var inc = 2 * Math.PI / 6;
    for (var index = 0; index < 6; index++){
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
    var height = r*2;
    var width = (Math.sqrt(3)/2) * height;
    var heightInc = 3 * (height / 4);
    // TODO: get dimensions from somewhere
    var row = 0;
    for (var y = height/2; y < 400; y += heightInc) {
      var startX = ((row % 2) == 0) ? width : width/2;
      for (var x = startX; x < 400; x += width) {
        this.BuildCell(x, y);
      }
      row ++;
    }

  }

}
