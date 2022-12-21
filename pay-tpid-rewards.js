/**
 * Service to call tpidclaim
 * Recommend run interval: daily
 * Console logs: server only. Do not send to discord
 */

import { FIOSDK } from '@fioprotocol/fiosdk';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

const { server, privateKey, publicKey, account } = process.env;

const baseUrl = server + '/v1/'

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const paytpidrewards = async () => {

  const user = new FIOSDK(
    privateKey,
    publicKey,
    baseUrl,
    fetchJson
  )

  try {
    let done = false;
    while (!done) {
      const result = await user.genericAction('pushTransaction', {
        action: 'tpidclaim',
        account: 'fio.treasury',
        data: {
          actor: account
        }
      })
      console.log('Result: ', result);
      if (result.status != 'OK') {done = true;}
      await delay(2000);
    }
    
  } catch (err) {
    if (err.json.fields[0].error == 'No work.') {
      console.log('No more tpid claims to process.');
    } else {
      console.log('Error: ', err);
    }
  }
}

paytpidrewards();