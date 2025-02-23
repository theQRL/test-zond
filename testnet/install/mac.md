---
layout: doc
outline: deep
title: "Mac Install"
description: "This page contains instructions for installing the Zond Testnet #BUIDL Preview on Mac."

---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info
Tested on MacOS Sequoia Version 15.3.1 (Apple Silicon)
:::


Getting started with the Zond testnet Local system

## 1. Install prerequisits 

If you haven't done so already, install brew, then install [docker](https://docs.docker.com/desktop/setup/install/mac-install/) and other prerequesits with brew.

```bash
brew install bazel@7 kurtosis-tech/tap/kurtosis-cli jq yq
```

Be sure to add bazel 7.5.0 to your path.

```bash
echo 'export PATH="/opt/homebrew/opt/bazel@7/bin:$PATH"' >> ~/.zshrc
```

## 2. Clone the repo & cd into it

```bash
git clone https://github.com/theQRL/qrysm -b dev && cd qrysm
```

And replace the version in .bazelversion

```bash
echo '7.5.0' > ../qrysm/.bazelversion
```

## 3. Running & testing the local Local Private Network

You can easily start and stop the local network by executing the following scripts

To start

```bash
bash ./scripts/local_testnet/start_local_testnet.sh
```

To stop

```bash
bash ./scripts/local_testnet/start_local_testnet.sh
```

To test the private test network (replace the MAPPED_PORT in the following with port that is mapped to 8545 that you see after running previous step which is Step 2. Start the private test network).

```bash
curl http://127.0.0.1:MAPPED_PORT/   -X POST   -H "Content-Type: application/json"   --data '{"method":"zond_getBlockByNumber","params":["latest", false],"id":1,"jsonrpc":"2.0"}' | jq -e
```

:::info Pro-tip: 
If you want to easily see what ports are mapped to 8545 you can use this command 

```
docker ps --format '{{.Ports}}' | grep 8545 | sed 's/0.0.0.0://g'
```
:::

# 4. PreMined Coins or Funding Accounts at Genesis

```bash
cd qrysm
nano scripts/local_testnet/network_params.yaml
```

In the yaml, under prefunded_accounts:

Add your Zond address with balance and restart the network

Once you restarted your network you can check the balance by the following command, (Replace MAPPED_PORT by the local mapped port for 8545 and YOUR_ADDRESS with the Zond address that you added in previous step)

```bash
curl -H "Content-Type: application/json" -X POST localhost:MAPPED_PORT --data '{"jsonrpc":"2.0","method":"zond_getBalance","params":["YOUR_ADDRESS", "latest"],"id":1}'
```