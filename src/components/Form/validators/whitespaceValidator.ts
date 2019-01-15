export const whitespaceValidator = (value: string) =>
  /^\s+$/.test(value) || value === "";
