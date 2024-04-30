export const selectorByName = <T>(name: keyof T) => `[name='${name as string}']`;
