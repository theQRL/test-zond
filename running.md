---
outline: deep
---

# Running your node

How to get started running your node.

## Download configuration and genesis files

Download the [config.yml](/config.yml) and [genesis.ssz](/genesis.ssz) files to the same directory as your `gzond` / `gzond.exe` executable.

## Run the Execution Engine

### Windows

```cmd.exe
gzond.exe --nat=extip:0.0.0.0 --betanet --http --http.api "web3,net,personal,zond,engine" --datadir=gzonddata console --syncmode=full
```

### Linux / MacOS

```bash
./gzond \
  --nat=extip:0.0.0.0 \
  --betanet \
  --http \
  --http.api "web3,net,personal,zond,engine" \
  --datadir=gzonddata console \
  --syncmode=full
```

## Run the Consensus Engine

### Windows

```cmd.exe
beacon-chain.exe --datadir=beacondata --min-sync-peers=1 --genesis-state=genesis.ssz --bootstrap-node= --chain-config-file=config.yml --config-file=config.yml --chain-id=32382 --execution-endpoint=http://localhost:8551 --accept-terms-of-use --jwt-secret=gzonddata/gzond/jwtsecret --contract-deployment-block=0 --minimum-peers-per-subnet=0 --p2p-static-id --bootstrap-node "enr:-MK4QHvqhyIzjAgNrS4cHZX34ploIHzO6QgzpZ-Cj6JtLYgPKwvLxJ8ZcOYyfVwNN5PT_s_YXd850DcYM5IgpT5shDOGAYw6adOyh2F0dG5ldHOIAAAAAAAAAACEZXRoMpBDxcTIIAAAk___________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQK6I2IsSSRwnOtpsnzhgACTRfYZqUQ1aTsw-K4qMR_2BohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" --bootstrap-node "enr:-MK4QLHC9R-ISy1mYg_wb0EWgEEoVopel2KMoWnOdnDiRzDLQLLgnUhfO8jM0eEmrq9yicphZUZocH-Fn4AHf6wM60qGAYw6aZ-wh2F0dG5ldHOIAAAAAAAAAACEZXRoMpBDxcTIIAAAk___________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQN_5eo8D8pFGWUX1SMAT7kMbY2a9Ryb6Bu2oAW8s28kyYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A"
```

### Linux / MacOS

```bash
./beacon-chain \
  --datadir=beacondata \
  --min-sync-peers=1 \
  --genesis-state=genesis.ssz \
  --bootstrap-node= \
  --chain-config-file=config.yml \
  --config-file=config.yml \
  --chain-id=32382 \
  --execution-endpoint=http://localhost:8551 \
  --accept-terms-of-use \
  --jwt-secret=gzonddata/gzond/jwtsecret \
  --contract-deployment-block=0 \
  --minimum-peers-per-subnet=0 \
  --p2p-static-id \
  --bootstrap-node "enr:-MK4QHvqhyIzjAgNrS4cHZX34ploIHzO6QgzpZ-Cj6JtLYgPKwvLxJ8ZcOYyfVwNN5PT_s_YXd850DcYM5IgpT5shDOGAYw6adOyh2F0dG5ldHOIAAAAAAAAAACEZXRoMpBDxcTIIAAAk___________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQK6I2IsSSRwnOtpsnzhgACTRfYZqUQ1aTsw-K4qMR_2BohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" \
  --bootstrap-node "enr:-MK4QLHC9R-ISy1mYg_wb0EWgEEoVopel2KMoWnOdnDiRzDLQLLgnUhfO8jM0eEmrq9yicphZUZocH-Fn4AHf6wM60qGAYw6aZ-wh2F0dG5ldHOIAAAAAAAAAACEZXRoMpBDxcTIIAAAk___________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQN_5eo8D8pFGWUX1SMAT7kMbY2a9Ryb6Bu2oAW8s28kyYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A"
```

## File Structure

The final file structure for the running system should look like this:

```bash
.
├─ gzond(.exe)
├─ beacon-chain(.exe)
├─ validator(.exe)
├─ qrysmctl(.exe)
├─ config.yml
├─ genesis.ssz
├─ beacondata/
│  ├─ ...
│  └─ ...
└─ gzonddata/
   ├─ ...
   └─ ...
```
