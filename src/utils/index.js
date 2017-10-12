export const namespace = (category, action) =>
  `@kd/kinops/queue/${category}/${action}`;
export const noPayload = type => () => ({ type });
export const withPayload = type => payload => ({ type, payload });
export const getAttributeValue = (value, defaultValue, ...sources) => {
  const best = sources.find(
    source =>
      source.attributes &&
      source.attributes[value] &&
      source.attributes[value].length > 0
  );

  if (best) {
    return best.attributes[value];
  }

  return [defaultValue];
};
