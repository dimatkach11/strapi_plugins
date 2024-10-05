'use strict';

/**
 * tour service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tour.tour');
