---
layout: doc
outline: deep
title: "Checking Status"
description: "How to check the status of your QRL 2.0 node"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: tip First run
It can take several minutes, occasionally longer, for blocks to start arriving on the first run.
:::

## Get the current block height

Query the execution engine for the latest block number:

::: code-group

```bash [Linux / Mac]
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"qrl_blockNumber","params":[],"id":1}' \
  http://127.0.0.1:8545
```

```cmd [Windows]
curl -X POST -H "Content-Type: application/json" ^
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"qrl_blockNumber\",\"params\":[],\"id\":1}" ^
  http://127.0.0.1:8545
```

:::

The response will contain a hex-encoded block number:

```json
{"jsonrpc":"2.0","id":1,"result":"0x1a4"}
```

## Check sync status

Query whether the node is still syncing with the network:

::: code-group

```bash [Linux / Mac]
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"qrl_syncing","params":[],"id":1}' \
  http://127.0.0.1:8545
```

```cmd [Windows]
curl -X POST -H "Content-Type: application/json" ^
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"qrl_syncing\",\"params\":[],\"id\":1}" ^
  http://127.0.0.1:8545
```

:::

If the node is fully synced, the response will be:

```json
{"jsonrpc":"2.0","id":1,"result":false}
```

If the node is still syncing, the response will include progress details:

```json
{"jsonrpc":"2.0","id":1,"result":{"startingBlock":"0x0","currentBlock":"0x1a4","highestBlock":"0x300"}}
```

## Check connected peers

Query the number of peers connected to your node:

::: code-group

```bash [Linux / Mac]
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://127.0.0.1:8545
```

```cmd [Windows]
curl -X POST -H "Content-Type: application/json" ^
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_peerCount\",\"params\":[],\"id\":1}" ^
  http://127.0.0.1:8545
```

:::

The response will contain a hex-encoded peer count:

```json
{"jsonrpc":"2.0","id":1,"result":"0x2"}
```
