'use strict';

/**
 * version service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::version.version');
