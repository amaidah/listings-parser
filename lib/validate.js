const validateString = (value) => {
  return (value != null && typeof value === 'string') ? value.trim() : null;
}

const validate = (value) => {
  return (value != null) ? value : null;
}

const validateUrl = (url) => {
  // check if url seems like a yelp url
  if (url.includes('yelp.com')) {
    // returns full url if no '?'
    return url.split('?')[0];
  }
  else {
    return null;
  }
}

export {
  validateString,
  validate,
  validateUrl,
};
