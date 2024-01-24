---
outline: deep
---

# Making a transaction

Send testnet Zond funds using a the `gzond` command line.

## Send a Zond transaction

Send 1 quanta in Wei,

```js
zond.sendTransaction({
  from:'0xFrom_Zond_Address',
  to:'0xTo_Zond_Address',
  value: 1000000000000000000,
  gas:21000
});
```

or using the web3 `toWei` conversion functions:

```js
zond.sendTransaction({
  from:'0xFrom_Zond_Address',
  to:'0xTo_Zond_Address',
  value: web3.toWei(1.0, 'ether'),
  gas:21000
});
```

## Estimate gas fees

There is a command function to estimate the gas fees of a transaction

> Change the to/from addresses and the amount.

```js
zond.estimateGas({
  from:'0xFrom_Zond_Address',
  to:'0xTo_Zond_Address',
  value: 1000000000000000000
});

// response:
21000
```

or using the `toWei` web3 function:

```js
zond.estimateGas({
  from:'0xFrom_Zond_Address',
  to:'0xTo_Zond_Address',
  value: web3.toWei(1.0, 'ether')
});

// response
21000
```
