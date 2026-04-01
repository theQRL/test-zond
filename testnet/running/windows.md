---
layout: doc
outline: deep
title: "Running on Windows"
description: "This page contains instructions for running the QRL 2.0 Testnet V2 on Windows"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

## Download configuration and genesis files

Download the ``config.yml`` and ``genesis.ssz`` files from the [go-qrl-metadata repository](https://github.com/theQRL/go-qrl-metadata/raw/refs/heads/main/testnet/testnetv2/) to the same directory as your `gqrl.exe` executable.

```cmd
curl -L -o https://raw.githubusercontent.com/theQRL/go-qrl-metadata/refs/heads/main/testnet/testnetv2/genesis.ssz
curl -LO https://raw.githubusercontent.com/theQRL/go-qrl-metadata/refs/heads/main/testnet/testnetv2/config.yml
```

## Run the Execution Engine (gqrl)

```cmd
gqrl.exe ^
  --nat=extip:0.0.0.0 ^
  --testnet ^
  --http ^
  --http.api "web3,net,qrl,engine" ^
  --datadir=gqrldata console ^
  --syncmode=full
```

## Run the Consensus Engine (Beacon Chain)

```cmd
beacon-chain.exe ^
  --datadir=beacondata ^
  --min-sync-peers=0 ^
  --genesis-state=genesis.ssz ^
  --chain-config-file=config.yml ^
  --config-file=config.yml ^
  --chain-id=32382 ^
  --execution-endpoint=http://localhost:8551 ^
  --accept-terms-of-use ^
  --jwt-secret=gqrldata\gqrl\jwtsecret ^
  --contract-deployment-block=0 ^
  --minimum-peers-per-subnet=0 ^
  --p2p-static-id ^
  --bootstrap-node "qnr:-Me4QKAyB33PkhFM0zY3r5i9GC7aSP_Zm39U8Y2rOIzr6443SngB1yhgGh7eFwNK0WNvDWjUbNksuJqME3ZEnwS9qJSGAZ1Gb_3yh2F0dG5ldHOIAAAAAAAAAACJY29uc2Vuc3VzkJCnUX4gAACJ__________-CaWSCdjSCaXCEI7LKF4lzZWNwMjU2azGhA7Z8d7NnIyueM0N06PyRt8jcnKvuRkMTmtzoDOw081ouiHN5bmNuZXRzAIN0Y3CCMsiDdWRwgi7g" ^
  --bootstrap-node "qnr:-Me4QE7keK-7ViWaDwpa0GtR12qbe9ZiVvKX95z7A2hkJHA6L-2A0n8G6dn8M1kubmxAeVw7Nwaa6IBPCX9765zNi56GAZ1Gb-8uh2F0dG5ldHOIAAAAAAAAAACJY29uc2Vuc3VzkJCnUX4gAACJ__________-CaWSCdjSCaXCEDSlCUolzZWNwMjU2azGhA9t_KLMx2GyZcw7tncC7iLdJpKBS_tCp9CavD6LXd5ZaiHN5bmNuZXRzAIN0Y3CCMsiDdWRwgi7g" ^
  --verbosity debug ^
  --log-file beacon.log ^
  --log-format text
```

::: info TIP
You might want to save these to different `.bat` files for easier reference (ie `1-gqrl.bat`, `2-beacon.bat`)
:::

## Next steps

Once your node is running, check out the [Checking Status](/testnet/usage/checking-status) page to verify everything is syncing correctly.
