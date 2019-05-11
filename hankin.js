// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

class Hankin {
  constructor(a,v) {

    this.a = a;
    this.v = v;
    this.end = p5.Vector.add(a, v);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
  }

}
