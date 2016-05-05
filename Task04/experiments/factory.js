/* decorator factory */

var Shapes = {
  Circle: function(param) {
    console.log("new " + param.color + " circle created with radius " + param.radius + "px");
  },
  Square: function(param) {
    console.log("new " + param.color + " square created with " + param.side + "px on a side");
  },
  Triangle: function(param) {
    console.log("new " + param.color + " triangle created with " + param.side + "px on a side");
  }
};

function ShapeFactory(size, color) {
  this.size = size;
  this.color = color;
}

ShapeFactory.prototype = {
  constructor: ShapeFactory,
  makeCircle: function() {
    return new Shapes.Circle({
      radius: this.size/2, color: this.color
    });
  },
  makeSquare: function() {
    return new Shapes.Square({
      side: this.size, color: this.color
    });
  },
  makeTriangle: function() {
    return new Shapes.Triangle({
      side: this.size, color: this.color
    });
  }
};

var factory = new ShapeFactory(100, "red");

factory.makeSquare();
factory.makeSquare();
factory.makeTriangle();
factory.makeCircle();
factory.makeTriangle();
