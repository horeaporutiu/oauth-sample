const { sampleCommandCallback } = require('./sample-command');

module.exports.register = (app) => {
  app.command('/horea4', sampleCommandCallback);
};
