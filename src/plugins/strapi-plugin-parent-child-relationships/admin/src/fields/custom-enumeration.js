import Icon from "../components/icons/CustomEnumerationIcon";
import pluginId from "../pluginId";
import getTrad from "../utils/getTrad";

const FIELD_NAME = "dynamic-root";

export default {
  name: FIELD_NAME,
  pluginId: pluginId,
  type: "json",
  icon: Icon,
  components: {
    Input: async () => import("../components/custom-enumeration/CustomEnumeration.jsx"),
  },
  inputSize: {
    default: 6,
    isResizable: true,
  },
  intlLabel: {
    id: getTrad("label", FIELD_NAME),
    defaultMessage: "Dynamic Relation Root",
  },
  intlDescription: {
    id: getTrad("description", FIELD_NAME),
    defaultMessage: "Change relation root between a set of defined relations",
  },
  options: {
    base: [
      {
        intlLabel: {
          id: getTrad("options", FIELD_NAME),
          defaultMessage: "Relations: one per row",
        },
        description: {
          id: getTrad("options.description", FIELD_NAME),
          defaultMessage: "List each relation name that exists in the current collection",
        },
        name: "options.enum",
        type: "textarea-enum",
      },
    ],
  },
};
