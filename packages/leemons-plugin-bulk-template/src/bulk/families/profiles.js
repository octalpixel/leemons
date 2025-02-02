const { keys } = require('lodash');
const path = require('path');
const itemsImport = require('../helpers/simpleListImport');

async function importFamilyProfiles(profiles) {
  const filePath = path.resolve(__dirname, '../data.xlsx');
  const items = await itemsImport(filePath, 'f_profiles', 5);

  /*
  We want items to be transformed from this:
  {"guardian":{"profile":"guardian"},"student":{"profile":"student"}}

  into this:
  {"guardian":"G","student":"S"}
  */

  keys(items).forEach((key) => {
    const subKey = keys(items[key])[0];
    items[key] = profiles[items[key][subKey]]?.id;
  });

  // console.dir(items, { depth: null });
  return items;
}

// ·····················································
// TESTING
/*
const PROFILES = {
  admin: { id: 'A' },
  teacher: { id: 'T' },
  student: { id: 'S' },
  guardian: { id: 'G' },
};

importFamilyProfiles(PROFILES);
*/

module.exports = importFamilyProfiles;
