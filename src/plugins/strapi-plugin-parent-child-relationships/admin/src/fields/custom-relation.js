import Icon from "../components/icons/CustomRelationIcon";
import pluginId from "../pluginId";
import getTrad from "../utils/getTrad";
import * as yup from "yup";

const FIELD_NAME = "relation";

export default {
  name: FIELD_NAME,
  pluginId: pluginId,
  type: "json",
  icon: Icon,
  components: {
    Input: async () => import("../components/custom-relation/CustomRelation.jsx"),
  },
  inputSize: {
    default: 6,
    isResizable: true,
  },
  intlLabel: {
    id: getTrad("label", FIELD_NAME),
    defaultMessage: "Parent-Child Relation",
  },
  intlDescription: {
    id: getTrad("description", FIELD_NAME),
    defaultMessage: "Select a custom relation with parent child options",
  },
  options: {
    base: [
      {
        intlLabel: {
          id: getTrad("options.name", FIELD_NAME),
          defaultMessage: "Relation name",
        },
        description: {
          id: getTrad("options.description", FIELD_NAME),
          defaultMessage: "Insert the name of relation",
        },
        name: "options.name",
        type: "text",
      },
    ],
    advanced: [
      {
        intlLabel: {
          id: getTrad("options.parent", FIELD_NAME),
          defaultMessage: "parent",
        },
        description: {
          id: getTrad("options.parent.description", FIELD_NAME),
          defaultMessage:
            "Insert the name of parent field. Leave empty if this field is the parent",
        },
        name: "options.parent",
        type: "text",
      },
      {
        intlLabel: {
          id: getTrad("options.current_column", FIELD_NAME),
          defaultMessage: "current table column",
        },
        description: {
          id: getTrad("options.current_column.description", FIELD_NAME),
          defaultMessage: "Enter the name of the current table column",
        },
        name: "options.current_column",
        type: "text",
      },
      {
        intlLabel: {
          id: getTrad("options.child_column", FIELD_NAME),
          defaultMessage: "child table column",
        },
        description: {
          id: getTrad("options.child_column.description", FIELD_NAME),
          defaultMessage:
            "Enter the name of the child table column, to filter options in the child component, with the selected value of the current table column.",
        },
        name: "options.child_column",
        type: "text",
      },
      {
        intlLabel: {
          id: getTrad("options.common_relational_table", FIELD_NAME),
          defaultMessage: "common relational table",
        },
        description: {
          id: getTrad("options.common_relational_table.description", FIELD_NAME),
          defaultMessage:
            "Enter the name of the common relational table, to filter options in the child component, based on the selected id of the same common relational table.",
        },
        name: "options.common_relational_table",
        type: "text",
      },
      {
        intlLabel: {
          id: getTrad("options.filter", FIELD_NAME),
          defaultMessage: "current table column filter",
        },
        description: {
          id: getTrad("options.filter.description", FIELD_NAME),
          defaultMessage:
            "Insert filter in json format to filter current table by the values defined in the json object",
        },
        name: "options.filter",
        type: "textarea",
      },
      {
        intlLabel: {
          id: getTrad("options.params.db_columns", FIELD_NAME),
          defaultMessage: "db_name: param_name - one per row",
        },
        description: {
          id: getTrad("options.params.db_columns.description", FIELD_NAME),
          defaultMessage:
            "Params are used in strapi.service(targetModel).find(params) method. The columns should be inserted in the following order: database column name corresponding to parameter name. Parameter names are the 'params' in child component",
        },
        name: "options.params.db_columns",
        type: "textarea-enum",
      },
      {
        intlLabel: {
          id: getTrad("options.params.statics", FIELD_NAME),
          defaultMessage: "static_value: param_name - one per row",
        },
        description: {
          id: getTrad("options.params.statics.description", FIELD_NAME),
          defaultMessage:
            "Params are used in strapi.service(targetModel).find(params) method. The data should be inserted in the following order: static value corresponding to parameter name. Parameter names are the 'params' in child component",
        },
        name: "options.params.statics",
        type: "textarea-enum",
      },
    ],
    validator: (args) => {
      const [cmeEditorFields, other, { modifiedData }] = args;
      const { filter, name } = modifiedData.options;

      try {
        if (filter && filter !== "") JSON.parse(filter);
      } catch (error) {
        return {
          format: yup.string().required({
            id: getTrad("options.filter", FIELD_NAME),
            defaultMessage: "The filter value must be in correct json format",
          }),
        };
      }

      if (!cmeEditorFields.includes(name)) {
        return {
          format: yup.string().required({
            id: getTrad("label", FIELD_NAME),
            defaultMessage: `The name of relation is required and must be equal to an existing relation filed name. See possibleFields`,
            relationName: name,
            possibleFields: cmeEditorFields,
          }),
        };
      }
    },
  },
};
