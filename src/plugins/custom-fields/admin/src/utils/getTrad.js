import pluginId from "../pluginId";

const getTrad = (id, fieldName) => {
  if (fieldName) return `${pluginId}.${fieldName}.${id}`;
  return `${pluginId}.${id}`;
};

export default getTrad;
