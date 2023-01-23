export const crudJSON = (
  query: string,
  entity: string,
  param: string,
  mode: 'create' | 'read' | 'update' | 'delete' = 'read'
) =>
  `
/**
 * An API that returns AI-generated content
 * 
const result = await api.${mode}(${JSON.stringify({ entity, param })});
console.log(result);
JSON: {`
