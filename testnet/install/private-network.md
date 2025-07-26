---
layout: doc
outline: deep
title: "Private Network Install"
description: "This page contains instructions for installing the QRL Project Zond Testnet using Kurtosis as a standalone private network"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

The QRL [`qrysm`](https://github.com/theqrl/qrysm) package contains scripts that allow for running a small local testnet using Kurtosis. This script will launch 2 beacon nodes, 2 validator clients and 2 gzond execution clients.

 This setup can be useful for testing and development.


 ## Installation

1. Install [Docker](https://docs.docker.com/get-docker/). Verify that Docker has been successfully installed by running `sudo docker run hello-world`.

1. Install [Kurtosis](https://docs.kurtosis.com/install/). Verify that Kurtosis has been successfully installed by running `kurtosis version` which should display the version.

1. Install [yq](https://github.com/mikefarah/yq). If you are on Ubuntu, you can install `yq` by running `snap install yq`.

1. Download the QRL qrysm Package using GitHub. `git clone https://github.com/theqrl/qrysm`. The startup sccripts and Kurtosis configuration files can be found in `qrysm/scripts/local_testnet` directory.

## Building and Running



Running `qrysm/scripts/local_testnet/start_local_testnet.sh` will build the `gzond` execution node, `qrysm` consensus node, and `qrysm` validator node binaries, will generate the genesis information and bootstrap everything together.

```
                  ========================================
                  =      PRIVATE NETWORK ARCHITECTURE      =
                  ========================================
      Validator Stack 1                      Validator Stack 2
+--------------------------+           +--------------------------+
|     vc-1-gzond-qrysm     |           |     vc-2-gzond-qrysm     |
|    (Validator Client)    |           |    (Validator Client)    |
+--------------------------+           +--------------------------+
             |                                      |
             v [1]                                  v [1]
+--------------------------+           +--------------------------+
|     cl-1-qrysm-gzond     |  <----->  |     cl-2-qrysm-gzond     |
|     (Consensus Node)     |    [3]    |     (Consensus Node)     |
+--------------------------+           +--------------------------+
             ^ |                                  ^ |
             | | [2]                              | | [2]
             | v                                  | v
+--------------------------+           +--------------------------+
|     el-1-gzond-qrysm     |  <----->  |     el-2-gzond-qrysm     |
|     (Execution Node)     |    [4]    |     (Execution Node)     |
+--------------------------+           +--------------------------+
LEGEND:
[1] Validator API: Validator Client connects to its Consensus Node.
[2] Engine API:    Consensus and Execution nodes are bidirectionally linked.
[3] Consensus P2P: Consensus nodes connect to each other to agree on chain state.
[4] Execution P2P: Execution nodes connect to each other to gossip transactions.
--------------------------------------------------------------------
```

:::info Configuration Options
This script will reference the configuration options declared in `qrysm/scripts/local_testnet/network_params.yml`. For a full reference to all configuration options and additional functions see the [Kurtosis guide](/testnet/usage/kurtosis).
:::


To start a testnet, from the Qrysm root repository:

```bash
cd ./scripts/local_testnet
./start_local_testnet.sh
```
You will see a list of services running and "Started!" at the end. The provate network is running and blocks are syncing.


To view all running services:

```bash
kurtosis enclave inspect local-testnet
```

To view the logs:

```bash
kurtosis service logs local-testnet $SERVICE_NAME
```

:::info
Kurtosis also comes with a web UI which can be open with `kurtosis web`.
:::

Some testnet parameters can be varied by modifying the `network_params.yaml` file. The full configuration reference for kurtosis is specified [here](https://github.com/theQRL/zond-package?tab=readme-ov-file#configuration).


## Stopping the testnet

To stop the testnet, from the Qrysm root repository:

```bash
cd ./scripts/local_testnet
./stop_local_testnet.sh
```

This will stop all running docker services, distroy the local encclave and stop the Kurtosis engine. Once complete you will see "Local testnet stopped.". 


## CLI options

The script comes with some CLI options, which can be viewed with `./start_local_testnet.sh --help`. 

One of the CLI options is to avoid rebuilding Qrysm each time the testnet starts, which can be configured with the command:

```bash
./start_local_testnet.sh -b false
```


