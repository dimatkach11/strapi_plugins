export function getRelationLink(targetModel, id) {
  return `/content-manager/collection-types/${targetModel}/${id ?? ''}`;
}
