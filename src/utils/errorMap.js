const errorMap = {
  ALREADY_EXISTS: 409,
  INVALID_TOKEN: 401,
  INVALID_FIELDS: 400,
  INVALID_VALUES: 400,
  MISSING_FIELDS: 400,
  NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
