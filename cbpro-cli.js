#!/usr/bin/env node

const os = require('os');
const path = require('path');
const minimst = require('minimist');
const dotenv = require('dotenv');
const CoinbasePro = require('coinbase-pro');
const prodUri = 'https://api.pro.coinbase.com';
const argv = minimst(process.argv.slice(2));
const home = os.homedir();
const file = path.join(home, '.cbpro', 'config.env');
dotenv.config({
  path: file
});
const apiUri = process.env.CBPRO_APIURI || prodUri;
const client = new CoinbasePro.AuthenticatedClient(
  process.env.CBPRO_KEY,
  process.env.CBPRO_SECRET,
  process.env.CBPRO_PASSPHRASE,
  apiUri
);

(async () => {
  const args = argv['_'];
  if (!Array.isArray(args) || !(args.length > 0)) {
    console.error(JSON.stringify({
      type: 'UsageError',
      message: 'Invalid Usage.'
    }, null, 2));
    process.exit(1);
  }
  const cmd = args[0];
  const meth = client[cmd];
  if (!meth) {
    console.error(JSON.stringify({
      type: 'UsageError',
      message: `${cmd} is not a valid command.`
    }, null, 2));
    process.exit(1);
  }
  const params = args.slice(1);
  const parsed = [];
  for (let i = 0; i < params.length; i++) {
    try {
      const json = JSON.parse(params[i]);
      parsed.push(json);
    } catch {
      parsed.push(params[i]);
    }
  }
  const resp = await meth.apply(client, parsed);
  if (resp) {
    console.log(JSON.stringify(resp, null, 2));
  }
})().catch(err => {
  const resp = err && err.response;
  const status = resp && resp.statusCode;
  const data = err && err.data;
  if (status && data) {
    console.error(JSON.stringify({
      type: 'ApiError',
      statusCode: status,
      data: data
    }, null, 2));
  } else {
    console.error(JSON.stringify({
      type: 'Error',
      message: err.message || ''
    }));
  }
  process.exit(1);
});