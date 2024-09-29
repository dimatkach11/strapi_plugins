'use strict';

/**
 * nation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nation.nation');
