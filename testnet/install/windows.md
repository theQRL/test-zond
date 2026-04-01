---
layout: doc
outline: deep
title: "Windows Install"
description: "This page contains instructions for installing the QRL 2.0 Testnet V2 on Windows."

---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info NOTES
Currently undergoing testing in Windows 11
:::

## Install prerequisites

- [Git for Windows](https://git-scm.com/download/win)
- [Golang for Windows](https://golang.org/dl/) v1.25 or later
- A GCC compiler: `choco install mingw` if using the [Chocolatey](https://chocolatey.org/) package manager, [TDM-GCC](https://jmeubank.github.io/tdm-gcc/) or see [MinGW-w64](https://www.mingw-w64.org/) for more options.

## Setup the environment

Make your QRL 2.0 directory. This is where the QRL 2.0 Testnet V2 repos, binaries, and data will be held.

```cmd
mkdir qrl-testnet
cd qrl-testnet
```

Clone the go-zond and qrysm GitHub repositories inside of the `qrl-testnet` directory, which we'll build from.

```cmd
git clone https://github.com/theQRL/go-qrl.git
git clone https://github.com/theQRL/qrysm.git
```

## Build QRL 2.0 binaries

### gqrl (Execution Layer)

gqrl is the official Golang execution layer implementation of the QRL 2.0 protocol.

```cmd
cd go-qrl
go build -o ..\gqrl.exe .\cmd\gqrl
cd ..
```

### Qrysm (Consensus Engine)

Qrysm is a Golang implementation of the QRL 2.0 Consensus specification, developed by The QRL and based on the Prysmatic Labs implementation of the Eth2 consensus specification.

```cmd
cd qrysm
go build -o ..\qrysmctl.exe .\cmd\qrysmctl
go build -o ..\beacon-chain.exe .\cmd\beacon-chain
go build -o ..\validator.exe .\cmd\validator
cd ..
```

## Next steps

After building the binaries, you'll want to run them, so head to our [Running](/testnet/running/windows) page.

## Troubleshooting

While the instructions above are tested on fresh OS installs, there will be a variety of system configurations that may cause issues.

If you encounter any other problems (or the solutions don't work for you), please [open an issue](https://github.com/theQRL/test-zond/issues).
