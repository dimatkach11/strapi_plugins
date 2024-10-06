const val = (value) => {
  if (value && value !== "null") return JSON.parse(value);
  return null;
};

const enumProps = ({ props, viewData }) => {
  try {
    const {
      error,
      attribute,
      value,
      intlLabel,
      onChange,
      name: fieldName,
    } = props;

    const { layout, initialData, modifiedData, relationDisconnect } = viewData;

    const enumOptions = attribute.options.enum;

    const relations = [];

    enumOptions.forEach((relationName) => {
      const layoutMetadata = layout.metadatas[relationName]?.edit;

      relations.push({
        relationName,
        relationLabel: layoutMetadata?.label,
      });
    });

    const disconnectRelations = () => {
      relations.forEach(({ relationName }) => {
        const relationsToDisconnect = modifiedData[relationName];
        relationsToDisconnect.forEach(({ id }) =>
          relationDisconnect({ name: relationName, id })
        );
      });
    };

    return {
      intlLabel,
      value,
      error,
      relations,
      initialData,
      onChange,
      fieldName,
      disabled: false,
      disconnectRelations,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { enumProps, val };
