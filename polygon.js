// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

function Polygon(sides) {
  this.interiorAngle = ((sides - 2) * PI) / sides;
  this.vertices = [];
  this.edges = [];

  this.addVertex = function(x, y) {
    var a = createVector(x, y);
    var total = this.vertices.length;
    if (total > 0) {
      var prev = this.vertices[total - 1];
      var edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() {
    var total = this.vertices.length;
    var last = this.vertices[total - 1];
    var first = this.vertices[0];
    var edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.interiorAngle);
    }
  }

  this.show = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }

}
