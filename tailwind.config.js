// tailwind.config.js – proxy that enables ts-node and forwards to the TS config
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('ts-node').register({ transpileOnly: true });
// eslint-disable-next-line @typescript-eslint/no-require-imports
module.exports = require('./tailwind.config.ts').default;