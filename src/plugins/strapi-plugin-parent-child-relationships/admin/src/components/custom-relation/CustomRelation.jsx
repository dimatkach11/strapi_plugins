import React from "react";

import {
  useCMEditViewDataManager,
  useFetchClient,
} from "@strapi/helper-plugin";

import { RelationInputDataManager } from "../RelationInputDataManager/RelationInputDataManager";

import utils from "./utils";

export default function CustomRelation(props) {
  const viewData = useCMEditViewDataManager();
  const { get } = useFetchClient();

  const dataManagerProps = utils.relationInputDataManagerProps({
    props,
    viewData,
  });

  const onComboboxChange = ({ relation, toOneRelation }) => {
    const { onChange, name, attribute } = props;

    let value = null;

    if (relation) {
      // relation data like { filter, parentSelectedId, params, ... } comes from server controller
      const { filter, parentSelectedId } = relation;
      value = { filter, parentSelectedId };

      if (relation.params) {
        const { db_columns, statics } = relation.params;

        const params = { ...db_columns, ...statics };

        if (Object.keys(params).length) {
          value = { ...value, params };
        }
      }
    }

    if (toOneRelation && relation?.id) {
      value = { ...value, selectedValue: { id: relation.id } };
    }

    // call findOne controller of TargetModel
    if (relation?.id && dataManagerProps?.targetModel) {
      utils.controller.findOne(relation.id, dataManagerProps.targetModel, get);
    }

    onChange({
      target: {
        name,
        type: attribute.type,
        value: JSON.stringify(value),
      },
    });
  };

  if (!dataManagerProps) return null;

  return (
    <RelationInputDataManager
      {...dataManagerProps}
      onComboboxChange={onComboboxChange}
    />
  );
}

CustomRelation.defaultProps = {
  value: "null",
};
