export default {
  COMPONENT_SELECTOR_LIST: `
    [data-if],
    [data-each],
    [data-out],
    [data-component]
  `,
  MESSAGE: {
    DUPLICATE_INSTANCE_NAME(name) {
      return `Found multiple parents with same name: ${name}. Parents much use unique,
      one-word instance names (e.g., [data-component="Constructor as unique_name"]) consisting
      of only letters.`;
    },
    UNREGISTERED_COMPONENT(name) {
      return `${name} is not a registered component.`;
    },
  },
};
