function SquareOctagonTiling(r) {

  this.polys = [];

  this.BuildOctCell = function(x, y) {

    var p = new Polygon();

    var sides = 8;
    var inc = (2*Math.PI)/sides;
    for (var i = 0; i < sides; i++) {
      var ang = (i * inc) - inc / 2;
      var vX = x + r * Math.cos(ang);
      var vY = y + r * Math.sin(ang);
      p.addVertex(vX, vY);

    }
    p.close();
    this.polys.push(p);

  }

  this.BuildSquareCell = function(x, y) {
    var p = new Polygon();

    var sides = 4;
    var inc = (2*Math.PI)/sides;

    var rr = 2*r * sin(Math.PI/8) * Math.cos(Math.PI/4);

    for (var i = 0; i < sides; i++) {
      var ang = (i * inc) - inc / 2;
      var vX = x + rr * Math.cos(ang);
      var vY = y + rr * Math.sin(ang);
      p.addVertex(vX, vY);

    }
    p.close();
    this.polys.push(p);
  }

  this.BuildGrid = function() {
    var h = r*2;
    var wo = r * Math.cos(Math.PI/8);
    var ws = 2 * r * sin(Math.PI/8);

    var hInc = h;

    var row = 0;
    for (var y = h/2; y < height; y += (wo + ws/2)) {
      var startX = wo;
      var col = (row % 2 == 0) ? 0 : 1;
      for (var x = startX; x < width; x += (wo + ws/2)) {
        ((col % 2) == 0) ? this.BuildOctCell(x, y) : this.BuildSquareCell(x, y);
        col ++;
      }
      row ++;
    }

  }


}
