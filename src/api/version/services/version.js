'use strict';

/**
 * version service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::version.version', ({strapi}) => ({
  async findOne(entityId, params) {
    const result = await super.findOne(entityId, params)

    return result
  },

  async find(params) {
    const result = await super.find(params)

    return result
  },
}));
