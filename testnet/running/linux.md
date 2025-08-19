---
layout: doc
outline: deep
title: "Running on Linux"
description: "This page contains instructions for running the Zond Testnet V1 On Linux"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

## Download configuration and genesis files

Download the ``config.yml`` and ``genesis.ssz`` files from the [go-zond-metadata repository](https://github.com/theQRL/go-zond-metadata/raw/refs/heads/main/testnet/testnetv1/) to the same directory as your `gzond` executable.

```bash
wget https://github.com/theQRL/go-zond-metadata/raw/refs/heads/main/testnet/testnetv1/genesis.ssz
wget https://raw.githubusercontent.com/theQRL/go-zond-metadata/refs/heads/main/testnet/testnetv1/config.yml
```

## Run the Execution Engine (gzond)

```bash
./gzond \
  --nat=extip:0.0.0.0 \
  --testnet \
  --http \
  --http.api "web3,net,zond,engine" \
  --datadir=gzonddata console \
  --syncmode=full \
  --snapshot=false
```

## Run the Consensus Engine (Beacon Chain)

```bash
./beacon-chain \
  --datadir=beacondata \
  --min-sync-peers=0 \
  --genesis-state=genesis.ssz \
  --bootstrap-node= \
  --chain-config-file=config.yml \
  --config-file=config.yml \
  --chain-id=32382 \
  --execution-endpoint=http://localhost:8551 \
  --accept-terms-of-use \
  --jwt-secret=gzonddata/gzond/jwtsecret \
  --contract-deployment-block=0 \
  --minimum-peers-per-subnet=0 \
  --p2p-static-id \
  --suggested-fee-recipient=Z20e526833d2ab5bd20de64cc00f2c2c7a07060bf \
  --bootstrap-node "enr:-MK4QM50zz3VrN3RgofTTWvFJaZx8fqPrebXtRPrfPma95LABun96pdS48x2vbs3tjjsba6hoTfJP60Jx5g68cjIGjGGAZiJNUY3h2F0dG5ldHOIAAAAAAAAAACEZXRoMpB0w1LqIAAAif__________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQJXCfi0hbGBlSV7exFKsa4iPU41kqSjXvxoTJd9bYwjGohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" \
  --bootstrap-node "enr:-MK4QKoucVoW4hO3nKFPXj1gyYq5_8T1NCpioRMTeFrOdX3IQk6j11_jeYCJ0r3FysBTv831YcuK1wKXfZJE81go7uWGAZiJNeqGh2F0dG5ldHOIAAAAAAAAAACEZXRoMpB0w1LqIAAAif__________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQPp77MwBxOSTTwLPYUci16GSPW9_6tcK1Dj7yDVh87xvIhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" \
  --verbosity debug \
  --log-file beacon.log \
  --log-format text
```

::: info TIP
You might want to save this to different files for easier reference (ie `1-gzond.sh`, `2-beacon.sh`)
:::

## Testing

You can run the following command to get the recent block height

```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"zond_blockNumber","params":[],"id":1}' http://127.0.0.1:8545
```

