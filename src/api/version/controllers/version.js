'use strict';

/**
 * version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::version.version');

module.exports = createCoreController('api::version.version', ({ strapi }) => ({
  async findOne(ctx) {
    const result = await super.findOne(ctx)

    return result
  },

  async find(ctx) {
    const result = await super.find(ctx)

    return result
  }
}))