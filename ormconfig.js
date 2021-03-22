module.exports = [
  {
    name: 'development',
    type: 'mongodb',
    database: 'graphjwtauth',
    synchronize: true,
    logging: true,
    entities: ['backend/entity/**/*.ts'],
    migrations: ['backend/migration/**/*.js'],
    subscribers: ['backend/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'backend/entity',
      migrationsDir: 'backend/migration',
      subscribersDir: 'backend/subscriber',
    },
  },
  {
    name: 'production',
    type: 'mongodb',
    database: 'graphjwtauth',
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['dist/entity/*.js'],
    migrations: ['dist/migration/*.js'],
    subscribers: ['dist/subscriber/*.js'],
  },
];
