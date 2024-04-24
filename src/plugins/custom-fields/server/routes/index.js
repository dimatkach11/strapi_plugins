const customRelationRoutes = require("./custom-relation");

module.exports = {
  admin: {
    type: "admin",
    routes: [...customRelationRoutes],
  },
};
