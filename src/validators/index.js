export const required = value => value;

export const minLength = (value, min) => value.length >= min;

export const maxLength = (value, max) => value.length <= max;

export const password = value => /^[0-9a-zA-Z]{8,}$/i.test(value);

export const email = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const equals = (value1, value2) => value1 === value2;
