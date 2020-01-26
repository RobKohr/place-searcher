const defaultConfig = require('./default.json');
const localConfig = require('./local.json');

const config = localConfig ? {...defaultConfig, ...localConfig} : defaultConfig;

module.exports = config;
