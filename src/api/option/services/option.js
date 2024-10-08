'use strict';

/**
 * option service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::option.option');
