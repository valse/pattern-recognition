module.exports = app => {
  const points = require("./points");

  // add point to the space
  app.route("/point").post(points.add);

  // get all points in the space
  app.route("/space").get(points.space);

  // get the longest line segment passing through at least N points
  app.route("/lines/:n").get(points.lines);
};
