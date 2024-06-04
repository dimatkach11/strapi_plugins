'use strict';

/**
 * free-course service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::free-course.free-course');
