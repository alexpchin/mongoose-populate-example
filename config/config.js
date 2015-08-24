var config = {
  database: {
    connectionString: "mongodb://localhost:27017/populate-schema-sample",
    databaseName: "populate-schema-sample"
  },
  debug: {
    database: {
      connectionString: "mongodb://localhost:27017/populate-schema-sample-dev",
      databaseName: "populate-schema-sample-dev"
    }
  }
};

module.exports = config;