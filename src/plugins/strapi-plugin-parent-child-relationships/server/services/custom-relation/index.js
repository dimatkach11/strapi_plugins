"use strict";

const helpers = require("./helpers");

module.exports = ({ strapi }) => ({
  async findMany(params) {
    const {
      mainField,
      targetModel,
      initialIdsToOmit = [],

      // from useRelation hook
      _q,
      idsToInclude = [],
      idsToOmit = [],
      page,
      pageSize,

      // from custom field options
      current_column,
      child_column,
      filter,
      common_relational_table,
      params: optionsParams,

      // from parent custom field ( parentData properties are also stored in db after creation )
      parentData,
    } = params;

    try {
      const filters = { ...filter, ...parentData?.filter };

      const populate = {};
      if (helpers.val(common_relational_table)) {
        populate[common_relational_table] = true;

        filters["$and"] = [
          {
            [common_relational_table]: { id: { $notNull: true } },
          },
        ];
      }

      if (helpers.val(_q) && mainField?.name) {
        filters[mainField.name] = { $containsi: _q };
      }

      const _initialIdsToOmit = initialIdsToOmit.filter(
        (id) => !idsToInclude.includes(id)
      );

      filters["id"] = { $notIn: [..._initialIdsToOmit, ...idsToOmit] };

      const options = {
        filters,
        populate,
        page,
        pageSize,
      };

      const strapiServiceParams = { ...parentData?.params };
      await strapi
        .service(targetModel)
        .find({ filters: strapiServiceParams, customRelationOptions: options });

      const entities = await strapi.entityService.findWithRelationCountsPage(
        targetModel,
        {
          ...options,
          sort: { [mainField?.name || "id"]: "asc" },
        }
      );

      entities.results.forEach((entity, index) => {
        entities.results[index] = {
          ...helpers.entityFilters({
            entity,
            current_column,
            child_column,
            common_relational_table,
            parentData,
            mainField,
            optionsParams,
          }),
        };
      });

      return entities;
    } catch (exp) {
      throw new Error(
        `Custom Relation Service: An error occurred when get findMany: ${exp.message}`
      );
    }
  },
  async findOne(ctx) {
    const { id, targetModel } = ctx.request.query;

    if (!id || !targetModel) return;

    const controllerCtx = {
      request: { header: ctx.request.header },
      params: { id },
      query: {},
    };

    try {
      return await strapi.controller(targetModel).findOne(controllerCtx);
    } catch (exp) {
      throw new Error(
        `Custom Relation Service: An error occurred when get findOne: ${exp.message}`
      );
    }
  },
});
