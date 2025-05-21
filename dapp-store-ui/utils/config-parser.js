// utils/config-parser.js

export const parseConfigValue = (value) => {
    // Ensure value is a string before trying to use string methods
    if (typeof value === 'string') {
        if (!isNaN(value)) return Number(value);
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
    }
    return value;
};
