const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
console.log('yes');
module.exports = require('knex')(configuration);