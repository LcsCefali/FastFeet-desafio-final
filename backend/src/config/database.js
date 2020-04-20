require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  // host: '192.168.99.100', //empresa
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
