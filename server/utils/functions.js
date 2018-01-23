const uuidv1 = require('uuid/v1');

function getUuid() {
  return uuidv1();
}

module.exports = {
  getUuid,
};
