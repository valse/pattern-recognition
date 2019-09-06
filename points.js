const collinear = require("./maths").collinear;
const points = [];

exports.add = (req, res) => {
  const point = req.body;

  // check the input
  if (
    !point ||
    isNaN(point.x) ||
    isNaN(point.y) ||
    Object.keys(point).length !== 2
  ) {
    return res.send("invalid point!");
  }

  // check exists
  if (points.some(p => p.x === point.x && p.y === point.y)) {
    return res.send("point already exists!");
  }

  points.push(point);

  res.send("point added succesfully!");
};

exports.space = (_, res) => {
  res.json(points);
};

exports.lines = (req, res) => {
  if (!req.params.n || isNaN(req.params.n) || req.params.n <= 1) {
    return res.send("you must specify two or more points!");
  }

  if (points.length <= 1) {
    return res.send("you need at least two points :-P");
  }

  if (req.params.n > points.length) {
    return res.send("I'm sorry, too few points :-(");
  }

  res.json(collinear(points, req.params.n));
};
