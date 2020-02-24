const fs = require('fs').promises;
const log = require('mk-log');

module.exports = async function gracefulStat(path, throwError) {
  try {
    return await fs.stat(path); 
  } catch (err) {
    if (err.code === 'ENOENT') {
      if (throwError) {
        log.error(err);
        return Promise.reject(err); 
      }
      return Promise.resolve();
    } else {
      log.error(err);
      return Promise.reject(err);
    }
  }
};
