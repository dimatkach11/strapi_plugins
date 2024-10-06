"use strict";

const plugin = require("../admin/src/pluginId");

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "parent-child-relation",
    plugin,
    type: "json",
  });
  strapi.customFields.register({
    name: "dynamic-root",
    plugin,
    type: "json",
  });
};
