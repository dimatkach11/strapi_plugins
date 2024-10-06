import pluginId from "../../pluginId";
const requestURL = `/${pluginId}/custom-relation`;

const CUSTOM_ENUMERATION = `plugin::${pluginId}.dynamic-root`;

const _value = (value) => {
  if (value && value !== "null") return JSON.parse(value);
  return null;
};

const relationInputDataManagerProps = ({ props, viewData }) => {
  try {
    const {
      error,
      attribute: { options },
      name: fieldName,
      onChange,
    } = props;

    const conditionalProps = {};

    const {
      slug,
      initialData,
      modifiedData,
      layout,
      isCreatingEntry,
      relationDisconnect,
    } = viewData;

    // this data comes from strapi custom field initial configuration
    let {
      parent,
      filter,
      name,
      current_column,
      child_column,
      common_relational_table,
      params,
    } = options;

    // because filter comes in json format from options
    if (filter && filter !== "") filter = JSON.parse(filter);

    // relation name from enumeration customField
    const isCustomEnumField =
      CUSTOM_ENUMERATION === layout.attributes[name].customField;

    if (isCustomEnumField) {
      const selectedRelation = _value(modifiedData[name])?.relationName;
      if (selectedRelation) name = selectedRelation;

      if (!selectedRelation) {
        const layoutCustomEnumAttributes = layout.attributes[name];
        const options = layoutCustomEnumAttributes.options;

        name = options.enum[0];

        options.enum?.forEach((relationName) => {
          const relation = initialData[relationName];

          if (relation?.length) {
            name = relationName;
          }
        });
      }
    }

    const layoutAttributes = layout.attributes[name];
    const { relationType, targetModel } = layoutAttributes;

    const initialTargetData = initialData[name];

    const initialIdsToOmit = initialTargetData.map((item) => item.id);

    const entityId = initialData.id;

    const layoutMetadata = layout.metadatas[name].edit;
    const { label, mainField, description, placeholder } = layoutMetadata;

    const intlLabel = {
      id: name,
      defaultMessage: label,
    };

    const endpoints = {
      relation: entityId
        ? `/content-manager/relations/${slug}/${entityId}/${name}`
        : null,
      search: requestURL,
    };

    // this data is sent to server controller
    const defaultParams = {
      targetModel,
      mainField,
      initialIdsToOmit,
      filter,
      current_column,
      child_column,
      common_relational_table,
      params,
    };

    if (parent && parent !== "") {
      // parent is the name of the parent custom field
      const parentData = _value(modifiedData[parent]);
      // filedName is the name of the current ( child ) custom field
      const currentData = _value(modifiedData[fieldName]);

      // parentData is only prepared for server controller ( used in the server side of the current ( child ) custom field )
      defaultParams["parentData"] = parentData;
      if (defaultParams.parentData === null) {
        conditionalProps["disabled"] = true;
      }

      if (!parentData?.selectedValue?.id) {
        conditionalProps["disabled"] = true;
      }

      const isParentRelationChangeValue =
        parentData?.selectedValue?.id != currentData?.parentSelectedId;

      if (isParentRelationChangeValue) {
        conditionalProps["disabled"] = true;

        const relationsToDisconnect = modifiedData[name] || [];

        relationsToDisconnect.forEach(({ id }) =>
          relationDisconnect({ name, id })
        );

        onChange({
          target: {
            name: fieldName,
            type: "json",
            value: JSON.stringify(null),
          },
        });
      }

      if (parentData?.selectedValue?.id && !currentData?.parentSelectedId) {
        conditionalProps["disabled"] = false;
      }

      if (isCustomEnumField) {
        conditionalProps["disabled"] = false;
      }
    }

    return {
      error,
      entityId,
      description,
      intlLabel,
      isCreatingEntry,
      isCloningEntry: false,
      mainField,
      name,
      queryInfos: {
        endpoints,
        defaultParams, // sent to server controller
        shouldDisplayRelationLink: true,
      },
      placeholder,
      relationType,
      targetModel,
      required: false,
      size: 6,
      ...conditionalProps,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const controller = {
  findOne: async (id, targetModel, get) => {
    try {
      const { data } = await get(requestURL + "/findOne", {
        params: {
          id,
          targetModel,
        },
      });

      return data;
    } catch (err) {
      return null;
    }
  },
};

export default { relationInputDataManagerProps, controller };
