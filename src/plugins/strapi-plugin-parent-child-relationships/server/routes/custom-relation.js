"use strict";

module.exports = [
  {
    method: "GET",
    path: "/custom-relation",
    handler: "customRelation.findMany",
  },
  {
    method: "GET",
    path: "/custom-relation/findOne",
    handler: "customRelation.findOne",
  },
];
