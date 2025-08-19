---
layout: doc
outline: deep
title: "Linux Install"
description: "This page contains instructions for installing the Zond Testnet V1 On Linux"
---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info NOTES
Tested on Ubuntu 24.04 & Fedora 41
:::

## Install prerequisites  

**Fedora**

```bash
sudo dnf install @development-tools
```

**Ubuntu 24.04**

```bash
sudo apt install build-essential git curl screen
```

### Install gobrew

**Either Fedora, Ubuntu or Mac**

```bash
curl -sL https://raw.githubusercontent.com/kevincobain2000/gobrew/master/git.io.sh | bash
```

::: info TIP
Be sure to add the installation path to your `~/.bashrc` as instructed at the end and `source ~/.bashrc` or start a new terminal session.
:::

## Setup the environment

Make your Zond directory. This is where the Zond Testnet V1 repos, binaries, and data will be held.

```bash
mkdir ~/zond-testnetv1/ && cd ~/zond-testnetv1/
```

Clone the go-zond and qrysm GitHub repositories inside of the `~/zond-testnetv1/` directory, which we'll build from.

```bash
git clone https://github.com/theQRL/go-zond.git
git clone https://github.com/theQRL/qrysm.git
```

## Build Zond binaries

First, make sure you're using `golang 1.21.5` 

```bash
gobrew use 1.21.5
```

### Gzond (Execution Layer)

Gzond is the official Golang execution layer implementation of the Zond protocol.

``` bash
cd go-zond/
make all
cp build/bin/gzond ../
cd ..
```
### Qrysm (Consensus Engine)

Qrysm is a Golang implementation of the Zond Consensus specification, developed by The QRL and based on the Prysmatic Labs implementation of the Eth2 consensus specification.

```bash
cd qrysm
go build -o=../qrysmctl ./cmd/qrysmctl
go build -o=../beacon-chain ./cmd/beacon-chain
go build -o=../validator ./cmd/validator
```

## Next steps

After building the binaries, you'll want to run them, so head to our [Running](/testnet/running/linux) page.

## Troubleshooting

While the instructions above are tested on fresh OS installs, there will be a variety of system configurations that may cause issues.

If you encounter any other problems (or the solutions don't work for you), please [open an issue](https://github.com/theQRL/test-zond/issues).