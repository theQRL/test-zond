---
outline: deep
---
# Installing on Linux

::: info
Tested on Ubuntu 22.04 (x86_64)
:::

This page contains instructions for installing the Zond node on Linux.

## Downloading binaries

The Zond node & PoS validator are available as pre-compiled binaries for some operating systems. The latest releases can be seen and downloaded from the [go-zond releases page](https://github.com/theQRL/go-zond/releases/) and [qrysm releases page](https://github.com/theQRL/qrysm/releases/) on GitHub.

## Building from Source

### Dependencies

The Zond node requires the following dependencies to be installed in order to be built from source:

- build-essential (gcc, g++, make, etc.) `sudo apt install build-essential`
- Golang v1.21 or later **and** 1.20.12

::: info TIP
gobrew is recommended to control go version on MacOS / Linux. Install with:\
```curl -sLk https://git.io/gobrew | sh -```
Follow the instructions to add gobrew to your path and confirm it is working with ```gobrew --version```
:::

### Clone the Zond repositories

```bash
git clone https://github.com/theQRL/go-zond.git
git clone https://github.com/theQRL/qrysm.git
```

### Build go-zond (the Execution Engine) with Golang v1.21 or later

``` bash
gobrew use 1.21.5
cd go-zond/
make gzond
cp build/bin/gzond ../
cd ..
```

### Build qrsym (Consensus Engine) with Golang v1.20

```bash
cd qrysm/
gobrew use 1.20.12
go build -o=../qrysmctl ./cmd/qrysmctl
go build -o=../beacon-chain ./cmd/beacon-chain
go build -o=../validator ./cmd/validator
```

::: info

If using a system-wide installation of Golang, ensure v1.20 is available to build the Consensus Engine and specify the version when building:

```bash
go install golang.org/dl/go1.20@latest
go1.20 download
go1.20 build -o=../qrysmctl.exe ./cmd/qrysmctl
go1.20 build -o=../beacon-chain.exe ./cmd/beacon-chain
go1.20 build -o=../validator.exe ./cmd/validator
```
