import Icon from "../components/icons/CustomEnumerationIcon";
import pluginId from "../pluginId";
import getTrad from "../utils/getTrad";

const FIELD_NAME = "custom-enumeration";

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
    defaultMessage: "Custom enumeration",
  },
  intlDescription: {
    id: getTrad("description", FIELD_NAME),
    defaultMessage: "Select a custom enumeration",
  },
  options: {
    base: [
      {
        intlLabel: {
          id: getTrad("options", FIELD_NAME),
          defaultMessage: "Relations: one per row",
        },
        name: "options.enum",
        type: "textarea-enum",
      },
    ],
  },
};
