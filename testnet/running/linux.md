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

```
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
  --min-sync-peers=1 \
  --genesis-state=genesis.ssz \
  --chain-config-file=config.yml \
  --config-file=config.yml \
  --chain-id=32382 \
  --execution-endpoint=http://localhost:8551 \
  --accept-terms-of-use \
  --jwt-secret=gzonddata/gzond/jwtsecret \
  --contract-deployment-block=0 \
  --minimum-peers-per-subnet=0 \
  --p2p-static-id \
  --bootstrap-node "enr:-MK4QNgAIppgu1ZjcrJNXuM1yut3z9JNDuk6bpllU2tp9tQNWzbry915_LpT2VNItZ22h9yEyYo5IQOGQc5vcq4j_taGAZXXC9joh2F0dG5ldHOIAAAAAAAAAACEZXRoMpB0w1LqIAAAif__________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQIhBcsnDFoKva4aeNktuAxWb7IxY948okJ1bpv20P_MGYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" \
  --bootstrap-node "enr:-MK4QGDGiGPBWgTiJ_cpoRpC6asB8jZM9c4f2TcMNxxZXeXrSKnjt-JOg5-Cy0F4XH9tMueLonODJtOu8E-UO6-9OWmGAZXXDBrIh2F0dG5ldHOIAAAAAAAAAACEZXRoMpB0w1LqIAAAif__________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQNPBaBuj93C-yFVRC4mWoK315QM9O0SWdf741t3sbPtNIhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A"
```

::: info TIP
You might want to save this to different files for easier reference (ie `1-gzond.sh`, `2-beacon.sh`)
:::

## Testing

You can run the following command to get the recent block height

```
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"zond_blockNumber","params":[],"id":1}' http://127.0.0.1:8545
```

