'use strict';

/**
 * model service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::model.model');
