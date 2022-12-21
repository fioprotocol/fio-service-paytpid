# fio-service-paytpid

A service that calls tpidclaim to distribute tpid rewards.

## Environment variables

Include a .env file with:

```
server=          # FIO API node (e.g., https://fio.blockpane.com)
privateKey=      # FIO private key
publicKey=       # FIO public key
account =        # FIO account that is associated with publicKey
```

## Usage

```
npm run pay-tpid      # Pay TPID rewards

```