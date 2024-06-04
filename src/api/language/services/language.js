'use strict';

/**
 * language service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::language.language');
