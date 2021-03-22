module.exports = [
  {
    name: 'development',
    type: 'mongodb',
    database: 'graphjwtauth',
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: ['backend/graphql/entity/**/*.ts'],
    migrations: ['backend/graphql/migration/**/*.js'],
    subscribers: ['backend/graphql/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'backend/graphql/entity',
      migrationsDir: 'backend/graphql/migration',
      subscribersDir: 'backend/graphql/subscriber',
    },
  },
  {
    name: 'production',
    type: 'mongodb',
    database: 'graphjwtauth',
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    useUnifiedTopology: true,
    entities: ['dist/graphql/entity/*.js'],
    migrations: ['dist/graphql/migration/*.js'],
    subscribers: ['dist/graphql/subscriber/*.js'],
  },
];
