const combinations = require("iter-tools").combinations;

exports.collinear = (points, n) => {
  let round = points.length;
  let results = [];

  // sort the points by y and then x
  points.sort((a, b) => {
    return a.y === b.y ? a.x - b.x : a.y - b.y;
  });

  // from the bigger points combination, I try to get the longest collinear line segment
  while (round >= n) {
    for (let c of combinations(points, round)) {
      if (angles(c).reduce((acc, val) => acc + val) === 0) {
        results.push(c);
      }
    }

    round -= 1;

    if (results.length) break; // the first results are the longest
  }

  return results;
};

// get the angles between each group of three points
const angles = points => {
  let angles = [];

  if (points.length === 2) {
    // two points drawn always a line :-)
    angles.push(0);
  }

  for (let c of combinations(points, 3)) {
    angles.push(angle(...c));
  }

  return angles;
};

// get the length of the segment between two points
const segmentLength = (exports.segmentLength = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
});

// angle between three points
const angle = (p1, p2, p3) => {
  var p12 = segmentLength(p1, p2);
  var p13 = segmentLength(p1, p3);
  var p23 = segmentLength(p2, p3);

  // for values less than -1 or greater than 1, Math.acos() returns NaN.
  return Math.acos(
    Math.min(
      Math.max(
        (Math.pow(p12, 2) + Math.pow(p13, 2) - Math.pow(p23, 2)) /
          (2 * p12 * p13),
        -1.0
      ),
      1.0
    )
  );
};
