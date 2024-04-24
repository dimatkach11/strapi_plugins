'use strict';

/**
 * model controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::model.model');
