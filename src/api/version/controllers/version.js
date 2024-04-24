'use strict';

/**
 * version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::version.version');
