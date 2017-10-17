export const required = value => {
  return value
}

export const minLength = (value, min) => {
  return value.length >= min
}

export const maxLength = (value, max) => {
  return value.length <= max
}

export const password = (value) => {
  return /^[0-9a-zA-Z]{8,}$/i.test(value)
}

export const email = value => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}

export const equals = (value1, value2) => {
  return value1 === value2
}
