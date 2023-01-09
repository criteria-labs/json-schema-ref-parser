// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

"use strict";

const nodeUtil = require("util");
const {  buildConfig } = require("@jsdevtools/karma-config");
const { host } = require("@jsdevtools/host-environment");

module.exports = (karma) => {
  
  const config = buildConfig({
    sourceDir: "lib",
    fixtures: "test/fixtures/**/*.js",
    browsers: {
      chrome: host.ci ? host.os.linux : true,
      firefox: host.ci ? host.os.linux : true,
      // TODO these were disabled as unstable. should we remove saucelabs or what?
      // safari: host.ci ? host.os.linux : host.os.mac,    // SauceLabs in CI
      edge: host.ci ? false : host.os.windows,  // SauceLabs in CI
      // ie: host.ci ? host.os.windows : false,  // IE needs to run by itself, due to Babel transforms
  
    }
  });

  config.files.push({
    pattern: "test/**/*.js",
    type: "module"
  });

  if (config.logLevel !== karma.LOG_DISABLE) {
    console.debug("Karma Config:\n", nodeUtil.inspect(config, {
      depth: 10,
      colors: true,
      compact: false,
    }));
  }

  karma.set(config);
};
