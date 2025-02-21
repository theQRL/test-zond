---
outline: deep
---

# Updating your node

1. Stop gzond and qrysm
2. Delete old binaries:

### Windows

``` cmd
del beacon-chain.exe gzond.exe qrysmctl.exe validator.exe
```

### Linux / MacOS

``` bash
rm beacon-chain gzond qrysmctl validator
```

3. Delete config.yml & genesis.ssz

### Windows

``` cmd.exe
del genesis.ssz config.yml
```

### Linux / MacOS

``` bash
rm genesis.ssz config.yml
```

4. Remove old beacondata and gzonddata directories:

### Windows

``` cmd.exe
rmdir /s /q beacondata gzonddata
```

``` bash
rm -rf beacondata gzonddata
```

5. Update both the go-zond and qrysm sources:

``` bash
cd go-zond
git pull
cd ..
cd qrysm
git pull
```

6. Rebuild binaries as per the [installation guide](/install)

7. Redownload the `config.yml` and `genesis.ssz` files as per the [running guide](/running.html).

8. Command line flags / enr data change between releases: use the [online, up-to-date documentation](/running.html) for the CLI parameters recommended to run.

::: info 2024-Jan-21 release

- new flag `--snapshot=false` for gzond
- new ENR data in `--bootstrap-node` for beacon-chain

:::
