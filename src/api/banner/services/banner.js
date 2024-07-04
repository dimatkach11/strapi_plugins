'use strict';

/**
 * banner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::banner.banner');
