function HexaTriangleSquareTiling(r) {
  this.r = r;
  this.polys = [];
  this.sides = 6;
  this.beta = Math.PI/this.sides;
  this.side = this.r* Math.sin(this.beta);
  this.h6 = this.r* Math.cos(this.beta);
  this.r3 = this.side/Math.sin(Math.PI/3);
  this.r4 = this.side/Math.sin(Math.PI/4);
  this.h3 = this.r3*Math.cos(Math.PI/3);
  this.h4 = this.r4*Math.cos(Math.PI/4);


  this.buildCell = function(x, y) {
    var sides = this.sides;
    console.log("sides : ",sides);
    var p;
    p = build_poly(x,y,this.r,this.sides,Math.PI/6);
    this.polys.push(p);
    var d4 = this.h6+this.h4;
    var d3 = this.r3+this.r;
    var D4A = p5.Vector.fromAngle(Math.PI/6);
    var D4B = p5.Vector.fromAngle(Math.PI/2);
    var D4C = p5.Vector.fromAngle(-Math.PI/6);
    D4A.setMag(d4);
    D4B.setMag(d4);
    D4C.setMag(d4);
    var D3A = p5.Vector.fromAngle(0);
    var D3B = p5.Vector.fromAngle(Math.PI/3);
    D3A.setMag(d3);
    D3B.setMag(d3);
    // p = build_poly(x-d3,y,this.r3,3);
    // this.polys.push(p);
    p = build_poly(x+D3A.x,y+D3A.y,this.r3,3);
    this.polys.push(p);
    p = build_poly(x+D3B.x,y+D3B.y,this.r3,3,2*Math.PI/6);
    this.polys.push(p);
    p = build_poly(x+D4A.x,y+D4A.y,this.r4,4,Math.PI/6);
    this.polys.push(p);
    p = build_poly(x+D4B.x,y+D4B.y,this.r4,4);
    this.polys.push(p);
    p = build_poly(x+D4C.x,y+D4C.y,this.r4,4,-Math.PI/6);
    this.polys.push(p);
  }

  // http://www.redblobgames.com/grids/hexagons/
  this.buildGrid = function() {

    var h = this.h6+this.h4;
    var w =  2*(this.r +this.r3+this.h3+this.h4);
    var inc = h;
    // TODO: get dimensions from somewhere
    var row = 0;
    for (var y = -h / 2; y < 400 + h/2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < 400; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }

  }

}
