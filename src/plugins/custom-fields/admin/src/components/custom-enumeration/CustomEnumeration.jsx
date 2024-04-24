import React, { useEffect, useState } from "react";

import { SingleSelect, SingleSelectOption } from "@strapi/design-system";

import { useCMEditViewDataManager } from "@strapi/helper-plugin";

import utils from "./utils";

export default function CustomEnumeration(props) {
  const viewData = useCMEditViewDataManager();

  const [initialValue, setInitialValue] = useState();

  const enumProps = utils.enumProps({
    props,
    viewData,
  });

  const {
    disabled,
    error,
    relations,
    value,
    intlLabel,
    initialData,
    onChange,
    disconnectRelations,
  } = enumProps;

  useEffect(() => {
    if (initialValue) return;

    relations.forEach(({ relationName }) => {
      const relation = initialData[relationName];

      if (relation?.length) {
        setInitialValue(relationName);
      }
    });
  }, [initialData]);

  if (!relations.length) return null;

  const onRelationChange = (relationName) => {
    const { name, attribute } = props;

    onChange({
      target: {
        name,
        type: attribute.type,
        value: JSON.stringify({
          relationName,
          selectedValue: { id: relationName },
        }),
      },
    });

    disconnectRelations();
  };

  const selectedRelation =
    utils.val(value)?.relationName || initialValue || relations[0].relationName;

  return (
    <SingleSelect
      disabled={disabled}
      error={error}
      label={intlLabel.defaultMessage}
      id={selectedRelation}
      name={selectedRelation}
      onChange={(relationName) => onRelationChange(relationName)}
      value={selectedRelation}
    >
      {relations.map(({ relationName, relationLabel }) => {
        return (
          <SingleSelectOption key={relationName} value={relationName}>
            {relationLabel}
          </SingleSelectOption>
        );
      })}
    </SingleSelect>
  );
}

CustomEnumeration.defaultProps = {
  value: "null",
};
