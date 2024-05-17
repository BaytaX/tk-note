export const mergeArrays = (base: any, overrides: any): any => {
  const baseMap = new Map(base.map((item) => [item.key, item]));
  for (const override of overrides) {
    const baseItem = baseMap.get(override.key);
    if (baseItem) {
      // Merge the base item with the override item
      Object.assign(baseItem, override);
    }
  }
  return Array.from(baseMap.values());
};
