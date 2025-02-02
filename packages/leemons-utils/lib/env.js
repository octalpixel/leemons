const _ = require('lodash');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const path = require('path');

module.exports = {
  env: (key, defaultValue) => _.get(process.env, key, defaultValue),
  generateEnv: (filename) =>
    new Promise((resolve) => {
      let _filename = filename;
      if (!filename) {
        resolve({});
      }
      if (!path.isAbsolute(_filename)) {
        _filename = path.join(process.cwd(), _filename);
      }

      fs.exists(_filename).then((exists) => {
        if (exists) {
          fs.readFile(_filename)
            .then((file) => {
              const config = dotenv.parse(file);
              resolve(config);
            })
            .catch(() => {
              throw new Error(`The .env file ${_filename} can not be read`);
            });
        } else {
          resolve({});
        }
      });
    }),
};
