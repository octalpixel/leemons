module.exports = {
  connections: {
    mysql: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        database: process.env['DATABASE_DATABASE'],
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        port: 3306,
        host: 'mysql',
        pool: {
          min: 5,
          max: 1000,
        },
      },
    },
    /*
    mongo: {
      connector: 'mongoose',
      settings: {
        database: process.env['NOSQL_DATABASE'],
        authDatabase: process.env['NOSQL_AUTH_DATABASE'],
        username: process.env['NOSQL_USERNAME'],
        password: process.env['NOSQL_PASSWORD'],
        port: process.env['NOSQL_PORT'],
        host: process.env['NOSQL_HOST'],
        // replicaSet: process.env['NOSQL_CLUSTER'],
        pool: {
          min: 5,
          max: 1000,
        },
      },
    },
    */
  },
  defaultConnection: 'mysql',
};
