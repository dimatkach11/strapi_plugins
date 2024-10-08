'use strict';

/**
 * offer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::offer.offer');
