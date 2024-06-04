'use strict';

/**
 * paid-course service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::paid-course.paid-course');
