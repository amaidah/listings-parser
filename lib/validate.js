const validateString = (value) => {
  return (value != null && typeof value === 'string') ? value.trim() : null;
}

const validate = (value) => {
  return (value != null) ? value : null;
}

const validateUrl = (url) => {
  // returns full url if no '?' found
  return url.split('?')[0];
}

export {
  validateString,
  validate,
  validateUrl,
};
