"use strict";

const pluginId = require("../../admin/src/pluginId");

module.exports = ({ strapi }) => ({
  async findMany(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service("customRelation")
      .findMany(ctx.request.query);

    return data;
  },
  async findOne(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service("customRelation")
      .findOne(ctx);

    return data;
  },
});
