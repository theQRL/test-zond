---
layout: doc
outline: deep
title: "Mac Install"
description: "This page contains instructions for installing the QRL 2.0 Testnet V2 on Mac."
---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info NOTES
Tested on macOS Tahoe (Apple Silicon)
:::

## Install prerequisites

Ensure Xcode command line tools are installed:

```bash
xcode-select --install
```

### Install gobrew

```bash
curl -sL https://raw.githubusercontent.com/kevincobain2000/gobrew/master/git.io.sh | bash
```

::: info TIP
Be sure to add the installation path to your `~/.zshrc` as instructed at the end and `source ~/.zshrc` or start a new terminal session.
:::

## Setup the environment

Make your QRL 2.0 directory. This is where the QRL 2.0 Testnet V2 repos, binaries, and data will be held.

```bash
mkdir ~/zond-testnet/ && cd ~/zond-testnet/
```

Clone the go-qrl and qrysm GitHub repositories inside of the `~/zond-testnet/` directory, which we'll build from.

```bash
git clone https://github.com/theQRL/go-qrl.git
git clone https://github.com/theQRL/qrysm.git
```

## Build QRL 2.0 binaries

First, make sure you're using `golang 1.25`

```bash
gobrew use 1.25
```

### gqrl (Execution Layer)

gqrl is the official Golang execution layer implementation of the QRL 2.0 protocol.

``` bash
cd go-qrl/
make all
cp build/bin/gqrl ../
cd ..
```
### Qrysm (Consensus Engine)

Qrysm is a Golang implementation of the QRL 2.0 Consensus specification, developed by The QRL and based on the Prysmatic Labs implementation of the Eth2 consensus specification.

```bash
cd qrysm
go build -o=../qrysmctl ./cmd/qrysmctl
go build -o=../beacon-chain ./cmd/beacon-chain
go build -o=../validator ./cmd/validator
```

## Next steps

After building the binaries, you'll want to run them, so head to our [Running](/testnet/running/mac) page.

## Troubleshooting

While the instructions above are tested on fresh macOS installs, there will be a variety of system configurations that may cause issues.

If you encounter any other problems (or the solutions don't work for you), please [open an issue](https://github.com/theQRL/test-zond/issues).
