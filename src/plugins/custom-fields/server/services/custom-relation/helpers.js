const val = (value) => value && value !== "";

const onlyIdName = (entity, mainField) => {
  if (mainField) {
    return {
      id: entity.id,
      [mainField.name]: entity[mainField.name],
    };
  }
  if (entity.name) {
    return { id: entity.id, name: entity.name };
  }
  return entity;
};

const entityColumnsFilter = (entity, current_column, child_column) =>
  val(current_column) && val(child_column)
    ? { filter: { [child_column]: entity[current_column] } }
    : {};

const entityCommonTableFilter = (entity, common_relational_table) =>
  val(common_relational_table) && entity[common_relational_table]?.id
    ? {
        filter: {
          [common_relational_table]: entity[common_relational_table].id,
        },
      }
    : {};

const parentSelectedId = (parentData) =>
  val(parentData?.selectedValue?.id)
    ? {
        parentSelectedId: parentData.selectedValue.id,
      }
    : {};

const splitKeyValueStr = (key_value_str = "") => {
  // Define a regular expression that matches either ":" or ": ".
  const [key, value] = key_value_str.split(/:\s?/);
  return [key, value];
};
const params = (entity, optionsParams = {}) => {
  const { db_columns, statics } = optionsParams;
  const paramsToReturn = {};

  // TODO: write better: optimize DRY
  if (db_columns) {
    const result = {};
    db_columns.forEach((key_value_str) => {
      const [key, value] = splitKeyValueStr(key_value_str);

      result[value] = { $eq: entity[key] };
    });

    paramsToReturn["params"] = { db_columns: result };
  }
  if (statics) {
    const result = {};
    statics.forEach((key_value_str) => {
      const [key, value] = splitKeyValueStr(key_value_str);

      result[value] = { $eq: key };
    });

    paramsToReturn["params"] = { ...paramsToReturn.params, statics: result };
  }

  return paramsToReturn;
};

const entityFilters = ({
  entity,
  current_column,
  child_column,
  common_relational_table,
  parentData,
  mainField,
  optionsParams,
}) => {
  return {
    ...onlyIdName(entity, mainField),
    ...entityColumnsFilter(entity, current_column, child_column),
    ...entityCommonTableFilter(entity, common_relational_table),
    ...parentSelectedId(parentData),
    ...params(entity, optionsParams),
  };
};

module.exports = {
  val,
  entityFilters,
};
