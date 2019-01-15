import _isEmpty from "lodash.isempty";

export const emptyStringValidator = (value: string) => _isEmpty(value);
