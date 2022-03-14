module.exports = {
  db: {
    mongo: {
      host: 'localhost',
      port: '27017',
      database: 'test',
    },
    redis: {
      host: 'localhost',
      port: '6379',
    },
  },
  authentication: {
    jwt: {
      secret: process.env.JWT_SECRET || 'SneakyPeeky1234#', // maintain absolute secrecy on this
      options: {
        verifyOptions: {
          algorithms: ['HS256'],
          ignoreExpiration: false,
          issuer: 'Hapi-Starter', // issuer name - app related
        },
      },
    },
  },
};
