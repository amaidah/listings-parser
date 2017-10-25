const validateString = (value) => {
  return (value != null && typeof value === 'string') ? value.trim() : null;
}

const validate = (value) => {
  return (value != null) ? value : null;
}

export { validateString, validate };
