const _ = require('lodash');
const usersService = require('../src/services/users');

module.exports = {
  detail: async (userId, { transacting } = {}) => {
    const users = await usersService.detail(userId, { transacting });
    const response = [];
    _.forEach(_.isArray(users) ? users : [users], ({ id, email, name, surnames, created_at }) => {
      response.push({ id, email, name, surnames, created_at });
    });
    return _.isArray(users) ? response : response[0];
  },
  isSuperAdmin: usersService.isSuperAdmin,
  detailForJWT: usersService.detailForJWT,
  hasPermissionCTX: usersService.hasPermissionCTX,
  // TODO Solo deberian de tener acceso los plugins que tengan permiso a ejecutar dichas funciones o los usuarios con permiso
  add: usersService.add,
  searchUserAgents: usersService.searchUserAgents,
  // TODO Pensar si los plugins deberian de solicitar permiso o si darle acceso siempre
  removeCustomPermission: usersService.removeCustomPermission,
  hasPermission: usersService.hasPermission,
};
