export const isEmpty = (value: string) => {
    return value === "" ||
        value === null ||
        value === "null" ||
        value === undefined ||
        value === "undefined" ||
        value === "INVALID" ||
        (value !== null && Array.isArray(value) && value.length === 0) ||
        (value !== null && typeof value === "object" && Object.keys(value).length === 0);
};
