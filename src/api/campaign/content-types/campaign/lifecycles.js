'use strict';

module.exports = {
  async beforeCreate(event) {
    try {
      const brandId = event.params.data.brand.connect[0]?.id
      if (brandId) {
        const brand = await strapi.entityService.findOne('api::brand.brand', brandId, {
          fields: ['brand_code'],
        })

        event.params.data.brand_code = brand.brand_code
      }
    } catch(err) {
      strapi.log.error(err)
    }
  },

  async beforeUpdate(event) {
    try {
      const brandId = event.params.data.brand.connect[0]?.id
      if (brandId) {
        const brand = await strapi.entityService.findOne('api::brand.brand', brandId, {
          fields: ['brand_code'],
        })

        event.params.data.brand_code = brand.brand_code
      }
    } catch(err) {
      strapi.log.error(err)
    }
  }
}