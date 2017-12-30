exports.getArgument = (app, arg) => {
  const value = app.getArgument(arg);
  if (!value) return null;
  if (typeof value === 'object' && typeof value.length === 'number') return value[0];
  return value;
};

exports.isEmptyArg = (arg) => {
  if (!arg) return true;
  if (typeof arg.length !== 'undefined' && arg.length === 0) return true;
  if (JSON.stringify(arg).trim() === '[]') return true;
  if (JSON.stringify(arg).trim() === '{}') return true;
  if (arg.trim() === '') return true;
  return false;
};

exports.overwriteDataFrom = (scureResponse, app) => {
  if (scureResponse.data) {
    app.data = scureResponse.data;
  }
};