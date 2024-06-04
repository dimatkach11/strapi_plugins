'use strict';

/**
 * course-option service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::course-option.course-option', ({strapi}) => ({
  async find(params) {
    const { customRelationOptions } = params

    const result = await super.find(params)

    // customRelationOptionals from custom relation plugin ( not from rest API )
    if (customRelationOptions?.filters?.course) {
      console.log(customRelationOptions?.filters?.course);
    }

    return result
  }
}));
