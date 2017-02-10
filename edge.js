// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video: https://youtu.be/sJ6pMLp_IaI
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

function Edge(a, b) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;

  this.show = function() {
    if (gridCheck.checked()) {
      stroke(255, 25);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
    this.h1.show();
    this.h2.show();
  }

  this.hankin = function(alpha) {
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);

    var half_len = v1.mag();

    var offset1 = mid;
    var offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    var alpha = alpha / 2;
    var beta = PI - alpha - radians(angle);
    var len = sin(alpha) * ((half_len + delta) / sin(beta));

    v1.setMag(len);
    v2.setMag(len);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);
  }

  this.findEnds = function(edge) {
    this.h1.findEnd(edge.h1);
    this.h1.findEnd(edge.h2);
    this.h2.findEnd(edge.h1);
    this.h2.findEnd(edge.h2);
  }

}
