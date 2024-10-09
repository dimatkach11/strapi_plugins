'use strict';

/**
 * test-repeatable service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-repeatable.test-repeatable');
