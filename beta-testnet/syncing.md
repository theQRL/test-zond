---
outline: deep
---

# Syncing

Once both the Execution and Consensus Engines are running the chain will begin syncing. This can take some time depending on your hardware and internet connection.

## Checking sync status

You can check the status of the sync by running the following command in the `gzond` console:

```bash
zond.syncing
```

This will display `true` if the node is still syncing, or `false` if it is fully synced.

## Sync progress

If you are a system with a bash shell, you can run the following command to follow the progress of the sync:

```bash
while true; do data=$(curl -s http://localhost:3500/zond/v1/node/syncing); hs=$(echo $data | jq -r .data.head_slot); sd=$(echo $data | jq -r .data.sync_distance); bcv=$(bc <<<"scale=30; $hs*100/($hs+$sd)"); value=$(printf '%.1f' "$bcv"); echo [$(date +"%Y-%m-%d %H:%M:%S%z")] Progress: $value%, Head Slot: $hs, Sync Distance: $sd; sleep 300; done;
```

A web front end is available [on Github](https://github.com/jplomas/zond-monitor) which will display the sync progress in a browser window.

[![Zond Monitor](/images/zond-monitor.png)](https://jplomas.github.io/zond-monitor/)
