const { defineConfig } = require('commandkit');

module.exports = defineConfig({
  src: 'src',
  main: 'index.mjs',
  watch: true,
  antiCrash: true,
});
