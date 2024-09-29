'use strict';

/**
 * nation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::nation.nation');
