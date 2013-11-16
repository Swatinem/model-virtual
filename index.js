module.exports = process.env.MODEL_VIRTUAL_COV
  ? require('./lib-cov')
  : require('./lib');
