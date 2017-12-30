exports.getArgument = (app, arg) => {
  const value = app.getArgument(arg);
  if (!value) return null;
  if (typeof value === 'object' && typeof value.length === 'number') return value[0];
  return value;
};
