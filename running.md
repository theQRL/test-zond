---
outline: deep
---

# Running your node

How to get started running your node.

## Download configuration and genesis files

Download the ``config.yml`` and ``genesis.ssz`` files from the [go-zond-metadata repository](https://github.com/theQRL/go-zond-metadata/tree/main/testnet/betanet) to the same directory as your `gzond` / `gzond.exe` executable.

## Run the Execution Engine

### Windows

```cmd.exe
gzond.exe --nat=extip:0.0.0.0 --betanet --http --http.api "web3,net,personal,zond,engine" --datadir=gzonddata console --syncmode=full --snapshot=false
```

### Linux / MacOS

```bash
./gzond \
  --nat=extip:0.0.0.0 \
  --betanet \
  --http \
  --http.api "web3,net,personal,zond,engine" \
  --datadir=gzonddata console \
  --syncmode=full \
  --snapshot=false
```

## Run the Consensus Engine

### Windows

```cmd.exe
beacon-chain.exe --datadir=beacondata --min-sync-peers=1 --genesis-state=genesis.ssz --chain-config-file=config.yml --config-file=config.yml --chain-id=32382 --execution-endpoint=http://localhost:8551 --accept-terms-of-use --jwt-secret=gzonddata/gzond/jwtsecret --contract-deployment-block=0 --minimum-peers-per-subnet=0 --p2p-static-id --bootstrap-node "enr:-MK4QB1-CQAEPXFwD0D_tS08YXWPsKuaWdCzentML2JhAJnvXUR4lSPHCRXHCjudviKciwBmbPirHjyL_kmI0T1ti6qGAY0sF6hgh2F0dG5ldHOIAAAAAAAAAACEZXRoMpDeYa1-IAAAk___________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQN_5eo8D8pFGWUX1SMAT7kMbY2a9Ryb6Bu2oAW8s28kyYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" --bootstrap-node "enr:-MK4QOiaZeOWRnUyxfJv0lTbvjh-Re4zfDBW7vNWl9wIW7n8OWzMmxhy8IVHgRF7QZrkm7OGShDogEYUtdg8Bt1nIqaGAY0sFwP7h2F0dG5ldHOIAAAAAAAAAACEZXRoMpDeYa1-IAAAk___________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQK6I2IsSSRwnOtpsnzhgACTRfYZqUQ1aTsw-K4qMR_2BohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A"
```

### Linux / MacOS

```bash
./beacon-chain \
  --datadir=beacondata \
  --min-sync-peers=1 \
  --genesis-state=genesis.ssz \
  --chain-config-file=config.yml \
  --config-file=config.yml \
  --chain-id=32382 \
  --execution-endpoint=http://localhost:8551 \
  --accept-terms-of-use \
  --jwt-secret=gzonddata/gzond/jwtsecret \
  --contract-deployment-block=0 \
  --minimum-peers-per-subnet=0 \
  --p2p-static-id \
  --bootstrap-node "enr:-MK4QB1-CQAEPXFwD0D_tS08YXWPsKuaWdCzentML2JhAJnvXUR4lSPHCRXHCjudviKciwBmbPirHjyL_kmI0T1ti6qGAY0sF6hgh2F0dG5ldHOIAAAAAAAAAACEZXRoMpDeYa1-IAAAk___________gmlkgnY0gmlwhC1MJ0KJc2VjcDI1NmsxoQN_5eo8D8pFGWUX1SMAT7kMbY2a9Ryb6Bu2oAW8s28kyYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A" \
  --bootstrap-node "enr:-MK4QOiaZeOWRnUyxfJv0lTbvjh-Re4zfDBW7vNWl9wIW7n8OWzMmxhy8IVHgRF7QZrkm7OGShDogEYUtdg8Bt1nIqaGAY0sFwP7h2F0dG5ldHOIAAAAAAAAAACEZXRoMpDeYa1-IAAAk___________gmlkgnY0gmlwhC0g6p2Jc2VjcDI1NmsxoQK6I2IsSSRwnOtpsnzhgACTRfYZqUQ1aTsw-K4qMR_2BohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A"
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
