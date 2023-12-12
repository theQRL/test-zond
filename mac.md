---
outline: deep
---
# Installing on Mac

::: info
Tested on MacOS Sonoma 14.1.2 (Apple Silicon)
:::

This page contains instructions for installing the Zond node on Mac.

## Downloading binaries

The Zond node & PoS validator are available as pre-compiled binaries for Windows. The latest release can be downloaded from the [releases page](https://theqrl.org/downloads/). **===TBD===**

## Building from Source

### Dependencies

The Zond node requires the following dependencies to be installed:

- XCode command line tools (``xcode-select –-install``)
- Golang v1.21 or later **and** 1.20.12

::: info TIP
gobrew is recommended to control go version on MacOS / Linux. Install with:\
```curl -sLk https://git.io/gobrew | sh -```
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
