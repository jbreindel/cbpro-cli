cbpro-cli
==========

The slimmest cli wrapper ever for [coinbase-pro-node](https://github.com/coinbase/coinbase-pro-node).

### Installation

```
npm install -g cbpro-cli
```

### Usage

1. Create a directory `.cbpro` in your home directory
2. In the directory create a file `config.env`

```
CBPRO_KEY="{key}"
CBPRO_SECRET="{secret}"
CBPRO_PASSPHRASE="{passphrase}"
```

Replace the values inside the quotes. More about keys located [here](https://github.com/coinbase/coinbase-pro-node#the-authenticated-api-client).

3. Invoke

```
$ cbpro getProducts
```

### Advanced

The interface takes the first parameter as the exact name of the method to invoke on the [AuthenticatedClient](https://github.com/coinbase/coinbase-pro-node#private-api-methods).

Any parameters after that are first parsed from json (if possible) and then applied to the function.

```
$ cbpro getAccount 32195173-0e1f-484b-8ded-465e6c46afc7
```

```
$ cbpro placeOrder '{"side": "sell", "price": "59000", "size": "1", "product_id": "BTC-USD"}'
```

For methods and parameters check [coinbase-pro-node](https://github.com/coinbase/coinbase-pro-node).