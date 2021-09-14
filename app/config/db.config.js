module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "viv@2001",
    DB: "backendauctionapp",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };