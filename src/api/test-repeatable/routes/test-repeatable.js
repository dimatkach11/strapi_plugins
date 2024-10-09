'use strict';

/**
 * test-repeatable router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::test-repeatable.test-repeatable');
